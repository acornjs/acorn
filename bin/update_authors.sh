echo "List of Acorn contributors. Updated before every release." > AUTHORS
echo >> AUTHORS
git log --format='%aN' | grep -v 'Adrian Heine né Lang' | grep -v abraidwood | grep -v Rich-Harris | grep -v ForbesLindesay | sort -u >> AUTHORS
