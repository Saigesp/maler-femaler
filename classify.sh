#!/usr/bin/env bash

# How to use it:
# Execute ./classify.sh
# Paste your names (one per line) into the terminal.
# Press Ctrl+D to signal end of input and start classifying.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FEMALE_FILE="$SCRIPT_DIR/public/names/female.txt"
MALE_FILE="$SCRIPT_DIR/public/names/male.txt"
IGNORE_FILE="$SCRIPT_DIR/public/names/ignore.txt"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║              NAME CLASSIFIER - Instructions          ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Paste names below (one per line), then press        ║"
echo "║  Ctrl+D when done to start classifying.              ║"
echo "║                                                      ║"
echo "║  For each name shown:                                ║"
echo "║    [f]  → Add to female.txt                          ║"
echo "║    [m]  → Add to male.txt                            ║"
echo "║    [q]  → Add to ignore.txt                          ║"
echo "║    any other key → Skip (name not saved)             ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

mapfile -t NAMES

total=${#NAMES[@]}

if [ "$total" -eq 0 ]; then
    echo "No names provided. Exiting."
    exit 0
fi

echo "Read $total name(s). Starting classification..."
echo ""

classified=0
skipped=0

for name in "${NAMES[@]}"; do
    # Trim whitespace
    name="$(echo "$name" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    [[ -z "$name" ]] && continue

    echo -n "  ▶  $name  →  [f]emale / [m]ale / [q]ignore / other=skip : "
    IFS= read -r -s -n 1 key </dev/tty
    echo "$key"

    case "$key" in
        f|F)
            echo "$name" >> "$FEMALE_FILE"
            echo "     ✔ Added to female.txt"
            ((classified++))
            ;;
        m|M)
            echo "$name" >> "$MALE_FILE"
            echo "     ✔ Added to male.txt"
            ((classified++))
            ;;
        q|Q)
            echo "$name" >> "$IGNORE_FILE"
            echo "     ✔ Added to ignore.txt"
            ((classified++))
            ;;
        *)
            echo "     — Skipped"
            ((skipped++))
            ;;
    esac
done

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║                     Summary                          ║"
echo "╠══════════════════════════════════════════════════════╣"
printf  "║  Classified : %-38s║\n" "$classified"
printf  "║  Skipped    : %-38s║\n" "$skipped"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
