# Pyenv with virtualenv 配置

- [Python multi versions](https://blog.tarswork.com/zh/post/managing-python-multiple-versions-using-pyenv-virtualenv)


```bash
$ brew install pyenv

# 查看可安裝的 Python 版本
pyenv install --list

# 查看所有已安裝的版本
pyenv versions

# 切換 Python 版本
pyenv global 3.10.12    對應於全域
pyenv local 3.10.12     對應於當前資料夾
pyenv shell 3.10.12     對應於當前 shell
```

- Note
```
# Load pyenv automatically by appending
# the following to
# ~/.bash_profile if it exists, otherwise ~/.profile (for login shells)
# and ~/.bashrc (for interactive shells) :

export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init - bash)"

# Restart your shell for the changes to take effect.

# Load pyenv-virtualenv automatically by adding
# the following to ~/.bashrc:

eval "$(pyenv virtualenv-init -)"
```

```bash
# 安裝 virtualenv
pip3 install virtualenv

# 建立虛擬環境
virtualenv venv

# 啟動環境
source venv/bin/activate

# 開發

# 導出依賴套件清單
pip3 freeze > requirements.txt

# 未來可以使用以下指令將必要套件安裝回來
pip3 install -r requirements.txt
```


## Issues
- [No module named '_lzma'](https://github.com/pandas-dev/pandas/issues/27532#issuecomment-514044754)