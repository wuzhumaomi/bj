# GitHub

简单的gitbud建一个仓库，然后clone，然后把文件放到这个文件夹

### 查看分支

```
git branch
```

### 1、创建一个新的仓库 

进入到你本地项目的根目录下，执行 `git init` 命令

qq

### 2、添加到仓库

执行 `git add .` 命令，将项目的所有文件添加到仓库中

### 3、索引内容添加到仓库中

执行`git commit -m "注释语句"` 命令，将索引内容添加到仓库中

### 4、在 [Github](https://github.com/ Github) 新建一个 Repository

### 5、获取地址

点击Create repository，跳转到如下页面，获取所创建的仓库的HTTPS地址

### 6、将本地的仓库关联到Github上

```
git remote add origin 【git链接 Https://wuzhumaomi.github.io/wxxcx/】
```

### 7、上传代码到github远程仓库

```
git push -u origin master
```

中间可能会需要让你输入Username和Password，输入github的账号和密码就行了。

### 8、创建分支

```
git status
git checkout -b myBranch
git status 
```

第一条命令，git status 命令用于显示工作目录和暂存区的状态。

下一个命令，git checkout -b myBranch（创建并切换分支），-b 告诉Git创建一个新的分支，并将它命名 myBranch，并 checkout 切换我们新创建的分支。

输入第三行，git status 以验证您刚才创建的新分支。

ps: git branch 列出您的计算机上Demo库中的所有分支

### 9.忽视

```
使用.gitignore
在.git 同级目录下创建.gitignore
*.a # 忽略所有 .a 结尾的文件
!lib.a # 但 lib.a 除外
/TODO # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build # 忽略 build目录， 及下面的文件

当然如果已经push了怎么办?当然也有解决方法，如下：有时候在项目开发过程中，突然心血来潮想把某些目录或文件加入忽略规则，按照上述方法定义后发现并未生效，原因是.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。那么解决方法就是先把本地缓存删除（改变成未track状态），然后再提交：
git rm -r --cached .
git add .
git commit -m ‘update .gitignore’

一般也会忽略.gitignore
```

### 10、删除仓库

1、先删除远程 Git 仓库

> git remote rm origin

2、再添加远程 Git 仓库

> git remote add origin git@github.com:FBing/java-code-generator

如果执行 git remote rm origin 报错的话，我们可以手动修改gitconfig文件的内容

> vi .git/config

### 11、分支

删除本地分支

```
git branch -d [branch name]
```

删除github远程分支

```
git push origin :[branch name]
```

# 常用

### 下载

```
git clone 【git链接 Https://wuzhumaomi.github.io/wxxcx/】
```

### 取回更新

如果您已经按上面的进行push，下面命令表示，当前分支自动与唯一一个追踪分支进行合并。

```
git pull 
```

从非默认位置更新到指定的url。

```
git pull http://git.example.com/project.git
```

### 添加新文件

我们有一个仓库，但什么也没有，可以使用add命令添加文件。

```
git add .
git add filename
```

可以使用add... 继续添加任务文件。

### 提交版本

现在我们已经添加了这些文件，我们希望它们能够真正被保存在Git仓库。

为此，我们将它们提交到仓库。

```
git commit -m "Adding files"
```

如果您不使用-m，会出现编辑器来让你写自己的注释信息。

当我们修改了很多文件，而不想每一个都add，想commit自动来提交本地修改，我们可以使用-a标识。

```
git commit -a -m "Changed some files"
```

### 发布版本

现在我们修改之后可以进行推送到服务器。

```
git push ssh://example.com/~/www/project.git
```