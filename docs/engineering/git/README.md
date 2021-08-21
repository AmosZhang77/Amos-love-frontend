### 修改最后一次注释

```shell
git commit --amend
```

出现有注释的界面（你的注释应该显示在第一行）， 输入i进入修改模式，修改好注释后，按Esc键 退出编辑模式，输入:wq保存并退出。

修改倒数第二次的注释：

```shell
git rebase -i HEAD~2
```

最后的数字2指的是显示到倒数第几次 比如这个输入的2就会显示倒数的两次注释

想修改哪条注释，就把哪条注释前面的pick换成edit，注意顺序是按时间顺序的，倒数第二条在最后一条上面。保存。

```shell
git commit --amend
```

改完之后

```shell
git rebase --continue
```

修改上次提交的用户名和邮箱

```shell
git commit --amend --author="junx.zhang001 <junx.zhang001@ke.com>"
```

修改之前提交的用户名和邮箱，和改之前的注释一样，就是amend多加参数

```shell
git rebase -i HEAD~2
```

最后的数字2指的是显示到倒数第几次 比如这个输入的2就会显示倒数的两次注释

想修改哪条注释，就把哪条注释前面的pick换成edit，注意顺序是按时间顺序的，倒数第二条在最后一条上面。保存。

修改参数加上名字和邮箱

```shell
git commit --amend --author="junx.zhang001 <junx.zhang001@ke.com>"
```

改完之后

```shell
git rebase --continue
```

### 修改项目的用户名邮箱

命令方式：

```shell
git config --global user.name "AmosZhang"
git config --global user.email "moonyellow@126.com"
```

直接修改文件方式：

打开项目文件夹，进入隐藏文件夹git，编辑config文件。（这样能改变以后提交的用户名和邮箱，改之前的看上面）

```text
[user]
name = Amos Zhang
email = moonyellow@126.com
```

### 合并两次已push的commit

有时候需要把近几次的commit合并成一个，比如提交了一个修改，后来发现有问题，fix完了又提交一次，这时可能会想把这两次commit合并为一个。下面这个命令可以实现：

```shell
git rebase -i HEAD~2
```

敲完这个命令并回车后，会出现类似下图所示界面：

<img src="./git1.png" width="994" height="356">

根据提示，把第二个“pick”改成“squash”，这样就可以把第二个commit合并到到第一个里，修改并保存后会出修改提交信息的界面。

这个界面会把两次commit的comments列出来，你可以任意修改成想要的注释，然后保存即可。

然后强制推到远端

```shell
git push -f
```
