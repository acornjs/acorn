echo "List of Acorn contributors. Updated before every release." > AUTHORS
echo >> AUTHORS
git log --format='%aN' | sort -uf >> AUTHORS
