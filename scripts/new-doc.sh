#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PT_TEMPLATE="$ROOT_DIR/docs/templates/TEMPLATE.pt.md"
EN_TEMPLATE="$ROOT_DIR/docs/templates/TEMPLATE.en.md"
PT_DIR="$ROOT_DIR/docs/pt"
EN_DIR="$ROOT_DIR/docs/en"

usage() {
  cat <<'EOF'
Usage:
  scripts/new-doc.sh <DOC_NAME> [PT_TITLE] [EN_TITLE]

Examples:
  scripts/new-doc.sh RISK-MANAGEMENT
  scripts/new-doc.sh INCIDENT-RESPONSE "Gestao de Incidentes" "Incident Response"

Arguments:
  DOC_NAME  File name without extension (recommended: UPPERCASE-WITH-HYPHENS)
  PT_TITLE  Optional Portuguese title for docs/pt file
  EN_TITLE  Optional English title for docs/en file
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -lt 1 ]]; then
  usage
  exit 0
fi

DOC_NAME="$1"
PT_TITLE="${2:-$DOC_NAME}"
EN_TITLE="${3:-$DOC_NAME}"

if [[ ! "$DOC_NAME" =~ ^[A-Za-z0-9._-]+$ ]]; then
  echo "Error: DOC_NAME contains invalid characters."
  exit 1
fi

if [[ ! -f "$PT_TEMPLATE" || ! -f "$EN_TEMPLATE" ]]; then
  echo "Error: template files not found under docs/templates."
  exit 1
fi

mkdir -p "$PT_DIR" "$EN_DIR"

PT_TARGET="$PT_DIR/$DOC_NAME.md"
EN_TARGET="$EN_DIR/$DOC_NAME.md"

if [[ -e "$PT_TARGET" || -e "$EN_TARGET" ]]; then
  echo "Error: target file already exists:"
  [[ -e "$PT_TARGET" ]] && echo "  - $PT_TARGET"
  [[ -e "$EN_TARGET" ]] && echo "  - $EN_TARGET"
  exit 1
fi

cp "$PT_TEMPLATE" "$PT_TARGET"
cp "$EN_TEMPLATE" "$EN_TARGET"

sed -i "1s|^# .*|# $PT_TITLE / $EN_TITLE|" "$PT_TARGET"
sed -i "1s|^# .*|# $EN_TITLE|" "$EN_TARGET"

echo "Created:"
echo "  - $PT_TARGET"
echo "  - $EN_TARGET"
