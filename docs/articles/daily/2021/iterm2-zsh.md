# MacOS + Iterm2 + Oh My Zsh

<SocialBlock hashtags="iterm2,zsh,shell,macos" />

## 安裝 Iterm2

### 下載 Iterm2

1. [官網下載](https://github.com/johnnywang1994/book.git)

2. Homebrew 安裝（已安裝 homebrew）

```
# 如果你從來沒有用過 brew cask 的話需要先跑這行
$ brew tap caskroom/cask
# 安裝 iTerm2
$ brew cask instal iterm2
```

調整 Preferences > Profiles > Terminal > Report Terminal Type 為 `xterm-256color`，為了顯示漂亮顏色


### 下載主題

可以[在這](https://iterm2colorschemes.com/)選擇喜歡的 Iterm2 主題，這邊用 [Tomorrow Night Eighties](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/schemes/Tomorrow%20Night%20Eighties.itermcolors)

調整 Preferences > Profile > Colors > Color Presets > Import 選擇剛剛下載的主題檔案後，記得再選擇一次才會套用


### 下載字體

為了支援特殊符號，需要下載專門的 powerline font, nerd font 字體

可以選自己愛的字體，這邊用 [SourceCodePro](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/SourceCodePro/Regular/complete)

調整 Preferences > Profiles > Text > Change Font



## 安裝 zsh

目前 MacOS 似乎已經有內建，如果沒有可以用以下指令安裝

```
$ brew install zsh
```

設定預設 shell

```
# 添加 zsh 指令來源到 /etc/shells
$ sudo sh -c "echo $(which zsh) >> /etc/shells" 
# 切換預設 shell
$ chsh -s $(which zsh)
```



## 安裝 Oh My Zsh

oh my zsh 是 zsh 的一個 framework，讓開發者更容易使用 zsh 的相關強大功能，幾乎是必裝的一個工具

```
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

安裝後會出現 `~/.oh-my-zsh` 資料夾

### 下載 zsh 主題

推薦使用 powerlevel9k，它可以做到很屌的事情，比如顯示 WiFi 訊號強度、筆電電池電力、CPU loading、system free memory 等等資訊在 command line

因為 powerlevel9k 不是內建主題，需要另外下載到 oh-my-zsh 的主題資料夾內

```
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

打開 zshrc 設定

```
$ vim ~/.zshrc
```

添加類似下面的設定，調整主題以及指令列顯示的順序功能，特殊功能可以在這看[使用詳情](https://github.com/Powerlevel9k/powerlevel9k#available-prompt-segments)

```
# 改變主題，增加特殊功能
ZSH_THEME="powerlevel9k/powerlevel9k"
# 使用強大的 nerd font 支援左側資料夾圖案
POWERLEVEL9K_MODE='nerdfont-complete'
# 特殊功能顯示方式
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir dir_writable vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status time)
```

最後執行以下指令刷新 shell 設定

```
$ exec $SHELL;
```


## 參考
- [超簡單！十分鐘打造漂亮又好用的 zsh command line 環境](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)
- [Mac終端機 (Terminal)設定： iTerm 2](https://medium.com/nitas-learning-journey/mac%E7%B5%82%E7%AB%AF%E6%A9%9F-terminal-%E8%A8%AD%E5%AE%9A-iterm2-ba63efd0df6a)

<SocialBlock hashtags="iterm2,zsh,shell,macos" />