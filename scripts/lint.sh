#!/bin/bash

mode="fix"
filters=()
run_typecheck=true

for arg in "$@"; do
  case $arg in
  --for=*)
    mode="${arg#--for=}"
    ;;
  --filter=*)
    filterArg="${arg#--filter=}"
    IFS=',' read -ra userFilters <<<"$filterArg"
    for monorepo in "${userFilters[@]}"; do
      filters+=(--filter "$monorepo")
    done
    ;;
  --no-typecheck)
    run_typecheck=false
    ;;
  esac
done

echo "Started (mode: $mode)"

if [[ "$mode" == "ci" ]]; then
  pnpm "${filters[@]}" --silent format --log-level silent >/dev/null 2>&1
  echo "Prettier Verified"

  pnpm "${filters[@]}" --silent lint >/dev/null 2>&1
  echo "ESLint Verified"

  if [[ "$run_typecheck" == true ]]; then
    pnpm "${filters[@]}" --silent typecheck >/dev/null 2>&1
    echo "TypeScript Verified"
  else
    echo "TypeScript Skipped"
  fi

elif [[ "$mode" == "check" ]]; then
  pnpm "${filters[@]}" --silent format --log-level silent
  echo "Prettier Checked"

  pnpm "${filters[@]}" --silent lint
  echo "ESLint Checked"

  if [[ "$run_typecheck" == true ]]; then
    pnpm "${filters[@]}" --silent typecheck
    echo "TypeScript Checked"
  else
    echo "TypeScript Skipped"
  fi

else
  pnpm "${filters[@]}" --silent format:fix --log-level silent
  echo "Prettier Completed"

  pnpm "${filters[@]}" --silent lint:fix
  echo "ESLint Completed"

  if [[ "$run_typecheck" == true ]]; then
    pnpm "${filters[@]}" --silent typecheck
    echo "TypeScript Completed"
  else
    echo "TypeScript Skipped"
  fi
fi

echo "Done"
