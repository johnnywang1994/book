# Git 客製化工具
- [Git useful alias](https://github.com/brauliobo/gitconfig/blob/master/configs/.gitconfig)

## change-commits
- [Link](https://stackoverflow.com/questions/2919878/git-rewrite-previous-commit-usernames-and-emails)

修改 commit 的 username, email
```bash
$ git config --global alias.change-commits '!'"f() { VAR=\$1; OLD=\$2; NEW=\$3; shift 3; git filter-branch --env-filter \"if [[ \\\"\$\`echo \$VAR\`\\\" = '\$OLD' ]]; then export \$VAR='\$NEW'; fi\" \$@; }; f"
```
- change author name
```bash
$ git change-commits GIT_AUTHOR_NAME "old name" "new name"
```
- change author email with last 10 commits
```bash
$ git change-commits GIT_AUTHOR_EMAIL "old@email.com" "new@email.com" HEAD~10..HEAD
```