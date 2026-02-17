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
import { useTranslation } from '@/hooks/use-translation';

interface RegistrationFormProps {
  onSuccess?: (citizen: Citizen) => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const addCitizen = useCitizenStore((s) => s.addCitizen);
  const { t } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [region, setRegion] = useState<Region | ''>('');
  const [tabanca, setTabanca] = useState('');
  const [phone, setPhone] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedCitizen, setSubmittedCitizen] = useState<Citizen | null>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t.código.nameRequired;
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = t.código.nameMinLength;
    }

    if (!gender) {
      newErrors.gender = t.código.selectGender;
    }

    if (!region) {
      newErrors.region = t.código.selectRegionError;
    }

    if (phone && !/^\d{7}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = t.código.phoneDigits;
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
      photo_url: photoPreview,
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
    setPhotoPreview(null);
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
              {t.código.registrationSuccess}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.código.citizenRegistered}
            </p>
          </div>
          <div className="w-full rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-green-600">código ID</p>
              <p className="mt-1 font-mono text-2xl font-bold text-green-900">
                {submittedCitizen.código_id}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">{t.código.nameLabel}</span>
                <p className="font-medium">{submittedCitizen.full_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t.código.regionLabel}</span>
                <p className="font-medium">{submittedCitizen.region}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              {t.código.newRegistration}
            </Button>
            <Button onClick={() => onSuccess?.(submittedCitizen)}>
              {t.código.viewIdCard}
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
          {t.código.registrationTitle}
        </CardTitle>
        <CardDescription>
          {t.código.registrationDesc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              {t.código.fullName} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder={t.código.namePlaceholder}
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
            <Label htmlFor="birthDate">{t.código.birthDate}</Label>
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
                {t.código.gender} <span className="text-destructive">*</span>
              </Label>
              <Select
                value={gender}
                onValueChange={(v) => setGender(v as Gender)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.gender}>
                  <SelectValue placeholder={t.código.select} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">{t.código.male}</SelectItem>
                  <SelectItem value="F">{t.código.female}</SelectItem>
                  <SelectItem value="O">{t.código.other}</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-xs text-destructive">{errors.gender}</p>
              )}
            </div>

            {/* Regiao */}
            <div className="space-y-2">
              <Label>
                {t.código.region} <span className="text-destructive">*</span>
              </Label>
              <Select
                value={region}
                onValueChange={(v) => setRegion(v as Region)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.region}>
                  <SelectValue placeholder={t.código.selectRegionPlaceholder} />
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
            <Label htmlFor="tabanca">{t.código.tabanca}</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="tabanca"
                placeholder={t.código.tabancaPlaceholder}
                value={tabanca}
                onChange={(e) => setTabanca(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t.código.phone}</Label>
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

          {/* Foto */}
          <div className="space-y-2">
            <Label>{t.código.photo}</Label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="photo-upload"
                className="flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="user"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <div className="text-sm text-muted-foreground">
                <p>{t.código.citizenPhoto}</p>
                <p className="mt-1 text-xs">
                  {photoPreview ? t.código.photoChangeHint : t.código.photoUploadHint}
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg">
            <Check className="mr-2 h-4 w-4" />
            {t.código.registerCitizen}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
