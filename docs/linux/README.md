## linux 前端开发环境

### 关闭window自带hyper-v

用vmware之前需要关闭hyper-v，两者冲突

yper-v管理器中先把之前装的linux删掉

管理员方式，cmd中运行bcdedit /set hypervisorlaunchtype off 关闭bcdedit

bcdedit检查hypervisorlaunchtype是否为off


重启电脑

### 卸载wsl子系统，关闭wsl

卸载以安装的子系统，开始菜单中找到子系统，右击，选择卸载

关闭wsl 控制面板，程序和功能，启用或关闭windows功能，将“适用于Linux的Windows子系统”勾掉

重启电脑

### vscode

### 以管理员方式运行vscode

用于改系统文件（没事的时候不要用管理员方式运行vscode）

sudo code --user-data-dir="~/.vscode-root"

### webstorm 

webstorm用dns解析，新建到host里面

185.199.108.133 raw.githubusercontent.com

下载webstrom 解压，把解压后文件夹移入安装目录：

sudo mv WebStorm-202.8194.6/ /opt

进入目录：

cd WebStorm-202.8194.6 

cd bin

安装命令：

./webstorm.sh

### 快捷方式

创建webstorm快捷方式

1. cd /usr/share/applications

在/usr/share/applications中创建webstorm.desktop文件，

sudo gedit webstorm.desktop

文件内容：

[Desktop Entry]
Name = WebStorm
Comment= WebStorm
Exec=/opt/WebStorm-2021.1.2/WebStorm-211.7442.26/bin/webstorm.sh
Icon=/opt/WebStorm-2021.1.2/WebStorm-211.7442.26/bin/webstorm.png
Terminal=false
Type=Application

### webstorm 安装 IDE eval reset 插件

setting, plugins， 齿轮，选择manage plugin repositories添加插件源，添加 https://plugins.zhile.io 

搜索插件 IDE eval reset 安装

2. 直接安装：
   选择从disc安装插件，选择ide-eval-resetter-2.1.6.zip




再去左下角所有程序里找到图标，右击添加到收藏
### 安装nvm

见https://github.com/nvm-sh/nvm

1. sudo apt  install curl

2. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

3. 上面成功安装后，运行

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


### 进入主目录 

~表示主目录

cd ~/文件夹

/表示更目录



### 安装fcitx输入法框架

sudo apt-get install fcitx

### 安装搜狗输入

先要安装fcitx框架，系统设置=>区域和语言=>管理已安装的语言 键盘输入法系统选择fcitx，点击应用到整个系统，重启

下载安装包

sudo dpkg -i sogoupinyin_2.4.0.3469_amd64.deb

### 百度输入法

官网下载解压，里面有安装说明

安装完百度输入法，预选字乱码，安装qt

sudo apt install qt5-default qtcreator qml-module-qtquick-controls2

### 安装git

sudo apt-get install git

### 改完hosts文件生效

/etc/init.d/networking restart

### 安装chrome

下载安装包

安装：
sudo dpkg -i google-chrome-stable_current_amd64.deb