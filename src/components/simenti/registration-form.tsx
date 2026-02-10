'use client';

import { useState } from 'react';
import { useCitizenStore } from '@/stores/citizen-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Camera, MapPin, Phone, Calendar, Check } from 'lucide-react';
import type { Citizen, Gender, Region } from '@/types';
import { REGIONS } from '@/types';

interface RegistrationFormProps {
  onSuccess?: (citizen: Citizen) => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const addCitizen = useCitizenStore((s) => s.addCitizen);

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [region, setRegion] = useState<Region | ''>('');
  const [tabanca, setTabanca] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedCitizen, setSubmittedCitizen] = useState<Citizen | null>(null);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Nome completo e obrigatorio';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!gender) {
      newErrors.gender = 'Selecione o genero';
    }

    if (!region) {
      newErrors.region = 'Selecione a regiao';
    }

    if (phone && !/^\d{7}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numero deve ter 7 digitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    const citizen = addCitizen({
      full_name: fullName.trim(),
      birth_date: birthDate || null,
      gender: gender as Gender,
      region: region as Region,
      tabanca: tabanca.trim() || null,
      phone: phone ? `+245${phone.replace(/\s/g, '')}` : null,
      photo_url: null,
      biometric_hash: null,
      registered_by: null,
    });

    setSubmittedCitizen(citizen);
    onSuccess?.(citizen);
  }

  function handleReset() {
    setFullName('');
    setBirthDate('');
    setGender('');
    setRegion('');
    setTabanca('');
    setPhone('');
    setErrors({});
    setSubmittedCitizen(null);
  }

  // Success state
  if (submittedCitizen) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-800">
              Registo Concluido com Sucesso!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              O cidadao foi registado no sistema Simenti ID.
            </p>
          </div>
          <div className="w-full rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-green-600">Simenti ID</p>
              <p className="mt-1 font-mono text-2xl font-bold text-green-900">
                {submittedCitizen.simenti_id}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Nome:</span>
                <p className="font-medium">{submittedCitizen.full_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Regiao:</span>
                <p className="font-medium">{submittedCitizen.region}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              Novo Registo
            </Button>
            <Button onClick={() => onSuccess?.(submittedCitizen)}>
              Ver Cartao de Identidade
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Registo de Cidadao
        </CardTitle>
        <CardDescription>
          Preencha os dados para emitir um Simenti ID - Identidade Digital da Guine-Bissau.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Ex: Amadu Djalo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-9"
                aria-invalid={!!errors.fullName}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="pl-9"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Genero and Regiao side by side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Genero */}
            <div className="space-y-2">
              <Label>
                Genero <span className="text-destructive">*</span>
              </Label>
              <Select
                value={gender}
                onValueChange={(v) => setGender(v as Gender)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.gender}>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Feminino</SelectItem>
                  <SelectItem value="O">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-xs text-destructive">{errors.gender}</p>
              )}
            </div>

            {/* Regiao */}
            <div className="space-y-2">
              <Label>
                Regiao <span className="text-destructive">*</span>
              </Label>
              <Select
                value={region}
                onValueChange={(v) => setRegion(v as Region)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.region}>
                  <SelectValue placeholder="Selecionar regiao" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      <MapPin className="mr-1 h-3 w-3" />
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && (
                <p className="text-xs text-destructive">{errors.region}</p>
              )}
            </div>
          </div>

          {/* Tabanca / Comunidade */}
          <div className="space-y-2">
            <Label htmlFor="tabanca">Tabanca / Comunidade</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="tabanca"
                placeholder="Nome da tabanca ou comunidade"
                value={tabanca}
                onChange={(e) => setTabanca(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                +245
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="9XX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ''))}
                className="pl-[4.5rem]"
                maxLength={9}
                aria-invalid={!!errors.phone}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Foto placeholder */}
          <div className="space-y-2">
            <Label>Foto</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50">
                <Camera className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Fotografia do cidadao</p>
                <p className="mt-1 text-xs">Funcionalidade disponivel em breve</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg">
            <Check className="mr-2 h-4 w-4" />
            Registar Cidadao
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
