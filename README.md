- [Full GIT course](https://youtu.be/O00FTZDxD0o?si=q1U6wC2giKM19oxM)

- [Lecture about DevOps](https://youtube.com/playlist?list=PLLELLTvDgUQ-iwnE9coLhb-ynyZUGzW6q&si=1YMwzEh2zhHRH_p7)

- [Roadmap DevOps by unknown man](https://youtu.be/2FsmJrorp9Q?si=FB-ew2L4uOU33J2R)

## Install Homebrew in MacOs

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Change mode

```sh
sudo chown -R $(whoami) /opt/homebrew
```

```sh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
```

```sh
source ~/.zshrc
```

```sh
brew doctor
```

## Generate ssh-key

```sh
ssh-keygen
```

### Three times push Enter and Go in GitHub and create NewSSHKey

### In Terminal Do for key ED25519

```sh
pbcopy < ~/.ssh/id_ed25519.pub
```

### For RSA Key

```sh
pbcopy < ~/.ssh/id_rsa.pub
```

### If you have repository in Github

```sh
{
    git clone git@github.com:username/Repo.git
    
    git config --list
    
    git config --global user.name "username"
    
    git config --global user.email "email"
}
```

### Open editor Nano

```sh
nano ~/.zshrc
```
### and add alias
```sh
{
    alias c="git add . && git commit -m upd && git push 
    
    origin main"
    
    alias s="git status"
    
    source ~/.zshrc
}
```

### Save changes

### Create PAT(personal access token) in GitHub
```sh
{
    brew install gh
    
    gh auth login
}
```

### Go in Obsidian > settings > community plugins > Browse

### in search write "Git" > choose Git by Vinzent > install > Enable

### Push CMD + P > Clone an existing repo

    https://username:Token@github.com/username/Repo.git 
     
     
     - Create virtual machine in web version Yandexcluod (Launch; Terminate)

     - Connect to Virtual Machine in Terminal  ssh -l ubuntu IP dynamic

## Create instance in terminal by yc cli

```sh
curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash
```

### restart shell

```sh
exec -l $SHELL
```

### Inicialization

```sh
yc init
```

```sh
yc --version
```

```sh
yc config list
```

```sh
yc help
```

# Create instance

```sh
yc compute instance create \
    --name my-vm \
    --hostname my-vm \
    --memory 4 \
    --cores 2 \
    --create-boot-disk size=20,image-folder-id=standard-images,image-family=ubuntu-2204-lts \
    --network-interface subnet-name=default-ru-central1-a,nat-ip-version=ipv4 \
    --zone ru-central1-a \
    --metadata ssh-keys="$(cat ~/.ssh/id_ed25519.pub)"
```

```sh
yc compute instance create \
    --name my-vm \
    --hostname my-vm \
    --memory 4 \
    --cores 2 \
    --create-boot-disk size=20,image-folder-id=standard-images,image-family=opensuse-15-3 \
    --network-interface subnet-name=default-ru-central1-a,nat-ip-version=ipv4 \
    --zone ru-central1-a \
    --
    --metadata ssh-keys="$(cat ~/.ssh/id_ed25519.pub)"
```
    

## View available list OS yandexcloud CLI

```sh
yc compute image list --folder-id standard-images --limit 5
```

### If you want to see only available image families (main categories), use:

```sh
yc compute image list --folder-id standard-images --limit 0 --jq '.[].family' | sort | uniq
```

### example:

```sh
{
    "ubuntu-2204-lts"
    "ubuntu-2204-lts-oslogin"
    "ubuntu-2204-lts-vgpu-v13+
    "centOS-8"
    "windows-server-2019"
}
``` 

### To show all images from a specific family, use

```sh
yc compute image list --folder-id standard-images | grep <идентификатор_семейства>
```

```sh
yc compute image list --folder-id standard-images | grep ubuntu-2204-lts
```

### in catalog web browser yc in "access right" add 5 roles

```sh
{
    `compute.disk.user`
    `compute.editor`
    `compute.images.user`
    `license-manager.viewer`
    `viewer`  
}
```
   
### Check VM list

```sh
yc compute instance list
```

### Get specific information about VM

```sh
yc compute instance get <name-vm>
```

### Check status

```sh
yc compute instance list --format yaml | grep -E "name|status"
```

### Get external IP

```sh
yc compute instance get <my-vm> --format json | jq
`'.network_interfaces[0].primary_v4_address.one_to_one_nat.address'`
```

### Connect to VM with SSH

```sh
ssh ubuntu@<external-ip>
```

### Stop-start-delete-reboot machine

```sh
yc compute instance stop <my_vm or id_vm>
```

```sh
yc compute instance start <my_vm or id_vm>
```

```sh
yc compute instance reboot <my_vm or id_vm>
```

### You can display a list of subnets and select the right

```sh
yc vpc subnet list
```

### Launch ssh-agent

```sh
eval "$(ssh-agent -s)"
```

### Add private key in agent

```sh
ssh-add ~/.ssh/id_ed25519
```

### Check it's done

```sh
ssh-add -l
```

## Mise install CLI "brew"

```sh
brew install mise
```

### Mise exec and run

```sh
mise exec python@3 -- python
```

##### this will download and install Python if it is not already installed Python 3.13.2
###### >>> ...

### or run node 22:

```sh
mise exec node@22 -- node -v
```

###### v22.x.x

###### [`mise x|exec`](https://mise.jdx.dev/cli/exec.html) is a powerful way to load the current `mise` context (tools & environment variables) without modifying your shell session or running ad-hoc commands with mise tools set. Installing [`tools`](https://mise.jdx.dev/dev-tools/) is as simple as running [`mise u|use`](https://mise.jdx.dev/cli/use.html)

```sh
mise use --global node@22
```

##### install node 22 and set it as the global default

```sh
mise exec -- node my-scripts.js
```

```sh
run my-scripts.js
```

###### with node 22...
###### if my-scripts.js can't open, maybe you have to install node.
###### check that you have Node.js

```sh
node -v
```

### if you don't have, have to install.

```sh
brew install node
```

### Launch node

```sh
node
```

## Install go

```sh
mise use -g go@latest
```

## Install ruby

```sh
mise use -g ruby@latest
```
###### ruby may not install in the end, maybe you have to install missing dependencies

```sh
brew install zlib readline libyaml libffi
```
###### Check Xcode Command Line Tools

```sh
xcode-select --install
```
###### Launch installation with detailed diagnostic output

```sh
mise install ruby@latest --verbose
```
    
# Docker

## Install docker

```sh
brew install docker
```

##### [or you can install docker from website] (https://www.docker.com/products/docker-desktop/)

### Check version

```sh
docker --version
```

### Check docker

```sh
docker run hello-world
```

### Launch new container  on ubuntu image

```sh
docker run -it ubuntu bash
```

     # you see command `root@<container_id>:/#`
     # you can do
     - ls
     - pwd
     - apt update
     - ...
     # for exit from container
     exit or `Ctrl + D`
 
# How do exit out of container and don't stop him

      `Ctrl + P, after Ctrl + Q`

# To reconnect to a running container

```sh
docker attach <container_id>
```

#### OR

```sh
docker exec -it <container_id> bash
```

## Check if container is running

```sh
docker ps
```

## View processes runing inside the container

```sh
docker top <container_id_or_name>
```

## View logs

```sh
docker logs <container_id_or_name>
```

## Command so that the user can execute Docker commands without using `sudo`

```sh
sudo usermod -aG docker $USER
```

## Docker compose
### Check that you have Docker compose

```sh
docker compose version
```

### [Создание Web-приложения Flask и деплой с помощью Docker Compose & Dockerfile](https://python.ivan-shamaev.ru/run-install-deploy-flask-web-app-docker-dockerfile-compose/)

#### Создадим папку с именем flask_docker для нашего приложения:
      
```sh
mkdir flask_docker
```

#### Переходим внутрь папки:

```sh
cd flask_docker
```
    
#### Если у Вас не установлена виртуальная среда venv, то необходимо ее исталлировать командой:

```sh
brew install python3.8-venv
```

#### Далее создаем виртуальную среду myenv
       
```sh
python3 -m venv myenv
```

#### Должна появиться директория myenv. Запускаем команду активации виртуальной среды:
        
```sh
source myenv/bin/activate
```

#### Внутри активированной виртуальной среды запускаем установку библиотеки Flask:
        
```sh
pip install Flask
```

#### После успешной установки Flask следующим шагом будет создание файла Python **app.py**, который будет получать запросы и отправлять ответы для нашего web-приложения. Для этого создадим директорию **webapp**:
        
```sh
mkdir webapp
```

```sh
cd webapp
```
    
#### Далее нам нужно в директории **webapp** создать файл файл **app.py** со следущим кодом внутри:
    
```sh
    {
        from flask import Flask
        
        app = Flask(__name__)

        @app.route('/')
        def home():
             return '<h1>Hello, World!</h1>'

        if __name__ == "__main__":
             app.run(debug=True, host='0.0.0.0', port=5000)
    }
```

### Как создать Python requirement.txt файл для Docker 

   `requirement.txt`

     содержит список пакетов и зависимостей,необходимых для запуска вашего проекта, а также их соответствующие версии, требуемые для корректной работы приложения.

#### Внутри активированной venv выполните следующую команду в терминале:
     
```sh
pip freeze > requirements.txt
```
     
#### Эта команда сгенерирует имена пакетов и их соответствующих версий, которые вы установили, а также некоторые другие встроенные зависимости, которые запускают ваше приложение Flask. Затем он сохраняет их в файле с именем requirements.txt
    
#### Вы можете проверить, работает ли приложение, прежде чем приступить к его контейнеризации. Запустите эту команду на своем терминале в корневом каталоге:
     
```sh
python app.py
```

### Настройка Dockerfile для создания образа приложения Flask

###### Создайте файл Dockerfile внутри webapp. 
     
###### Добавьте в файл следующий фрагмент кода:

```sh     
start by pulling the python image
FROM python:3.8-alpine
```
     
###### copy the requirements file into the image

```sh     
COPY ./requirements.txt /app/requirements.txt
```    

###### switch working directory
```sh     
WORKDIR /app
```
     
###### install the dependencies and packages in the requirements file

```sh     
RUN pip install -r requirements.txt
```
    
###### copy every content from the local file to the image

```sh
COPY . /app
```
     
###### configure the container to run in an executed manner

```sh     
ENTRYPOINT ["python"]
```

```sh       
CMD ["app.py"]
```

###  Создадим образ (image) Docker

##### Выйдем из активированной среды venv:
       
```sh
deactivate
```
 
##### Для этого необходимо в командном окне (не в активированной среде), запустить команду:
      
```sh
sudo docker image build -t flask_docker .
```

## On MacOs using "Brew services..."

```sh
brew services start nginx
brew services stop nginx
brew services restart nginx
```

### On Linux using "systemctl..."

```sh
sudo systemctl start nginx    # запустить
sudo systemctl stop nginx     # остановить
sudo systemctl reload nginx   # применить изменения без остановки
```

# Roadmap for Junior DevOps v2

### Необходимо научиться работать с Linux, знать bash

#### Развернуть Nginx на Linux и настроить так, чтобы сайт был доступен по внутреннему адресу.
     в этом помогут:
     - Linux (Ubuntu/Debian или CentOS)
     - команды bash (apt, yum, systemctl)
     - базовая конфигурация Nginx

### Установка Nginx на MacOS

    Установите Homebrew, если его нет:
    
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
     
    Затем установите Nginx:
    
```sh
brew install nginx
```
    
    Конфигурационный файл находится в  /opt/homebrew/etc/nginx/nginx.conf  (для Apple Silicon) или  /usr/local/etc/nginx/nginx.conf  (для Intel).

### Запуск и проверка Nginx

    Запустите Nginx:
    
```sh
brew services start nginx
```
  или

```sh
nginx
```

   (для порта 8080 по умолчанию без sudo).
  
   Для порта 80 используйте
   
```sh
sudo brew services start nginx
```
   Проверьте статус:
   
```sh
brew services list | grep nginx
```
   и доступ:

     http://localhost:8080 (по умолчанию) или http://localhost.

### Определение внутреннего IP-адреса

    Внутренний IP macOS обычно 192.168.x.x или 10.x.x.x в локальной сети.  Узнайте его:
    
```sh
ifconfig en0 | grep inet
```
    (ищите inet без 127.0.0.1) или
  
```sh
ipconfig getifaddr en0
```
    Например, если IP 192.168.1.100, сайт доступен по http://192.168.1.100:8080 с других устройств в сети.

### Настройка для внутренней сети

    Отредактируйте  nginx.conf :
    
```sh
nano /opt/homebrew/etc/nginx/nginx.conf
```

    В блоке  server  измените  listen 8080;  на  listen 192.168.1.100:8080;  (ваш IP) или  listen 0.0.0.0:8080;  для всех интерфейсов.  Укажите root:  root /opt/homebrew/var/www;  и создайте тестовый index.html там. 

    Проверьте конфиг:
      
 ```sh
 nginx -t
 ```

    перезапустите:
  
 ```sh
 brew services restart nginx
 ```
    Разрешите в файрволе (System Settings > Network > Firewall > Options > добавьте nginx).  Сайт теперь доступен по внутреннему IP в локальной сети. 
#### Настроить ротацию логов Nginx, чтобы старые автоматически архивировались и не занимали место.
     в этом помогут:
     - logrotate и его конфиги
     - путь и структура логов Nginx(/var/log/nginx)
     - команда logrotate -d для теста настроек

### Настройка logrotate для Nginx
    
    Logrotate автоматически архивирует, сжимает и удаляет старые логи Nginx, предотвращая заполнение диска.  На Linux (Ubuntu/Debian) logrotate предустановлен; 
    
    на macOS установите через

```sh
brew install logrotate
```

    Создайте или отредактируйте конфиг  /etc/logrotate.d/nginx  (Linux) или  /opt/homebrew/etc/logrotate.d/nginx  (macOS).

    Пример конфигурации logrotate

```sh
    /var/log/nginx/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    create 0640 www-data adm
    postrotate
        [ ! -f /var/run/nginx.pid ] || kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```
    Эта настройка ротирует логи ежедневно, хранит 14 архивов (gzip), создает новые с правами и сигнализирует Nginx открыть свежий файл.  Для macOS пути:  /opt/homebrew/var/log/nginx/*.log  и  kill -USR1 $(cat /opt/homebrew/var/run/nginx.pid) .

### Проверка и запуск

    Проверьте конфиг:
    
```sh
logrotate -d /etc/logrotate.d/nginx
```  (debug без выполнения).
  
  Тестируйте:
  
```sh
logrotate -f /etc/logrotate.d/nginx
```

    Cron запускает logrotate ежедневно (/etc/cron.daily/logrotate);
    на macOS настройте launchd или cron.  
    
    Мониторьте место:
    
```sh
du -sh /var/log/nginx/
```

###Дополнительные опции
	
    •	 weekly  или  monthly  вместо  daily  для реже ротации. 
	
    •	 rotate 30  для месяца хранения,  size 100M  для ротации по размеру. 
	
    •	 dateext -%Y-%m  для имен вроде access.log-2025-12.gz. Учитывая опыт с Linux/macOS серверами, настройте отдельно для access.log и error.log. 

#### Автоматизировать создание нескольких пользователей, выдать им доступ к нужным группам и настроить вход по SSH.
     - bash скрипты (циклы и условия)
     - команды useradd, usermod, groupadd
     - настройка SSH-keys & authorized_keys

### с помощью команды docker run -it ubuntu sh создал изолированный контейнер для практики, хочу попрактиковаться с докером, там нет Docker, его надо установить, с помощью sudo не получается, пока не знаю почему, буду пробовать без sudo

```sh
apt update && apt upgrade -y
```

### Устанавливаю зависимости

```sh
apt install -y ca-certificates curl gnupg lsb-release
```

### Добавляю GPG ключ Docker

```sh
mkdir -p /etc/apt/keyrings
```

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

### Решаем проблему с sudo

```sh
su -
```

```sh
apt update
```

```sh
apt install sudo
```

```sh
usermod -aG sudo $(whoami)
```

```sh
exit
```

### Установка OrbStack на macOS m4 через Homebrew

```sh
brew install --cask orbstack
```

### Если нет Homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

После установки запустите OrbStack из Applications, предоставьте права администратора при первом запуске — он автоматически настроит Docker CLI и shell-интеграцию в ~/.zprofile or ~/.zshrc

### После установки orbstack он может не использоваться из-за ряда причин:
     1. Не прошел этап активации (ошибка connection reset)
     2. CLI orbstack не установился в систему и Docker CLI всё ещё привязан к старому пути Docker Desktop.
     3. Сетевая активация не завершилась
        a) возможны проблемы с соединением
        b) включен VPN, прокси, корпоративный фаервол, DPI, провайдер)
    4. CLI не установился в PATH
    5. Docker всё ещё смотрит на Docker Desktop.
    Сейчас  docker  пытается подключиться к сокету  docker.raw.sock  в папке Docker Desktop и падает с  no such file or directory . Это нормально, когда старый движок выключен, а новый (OrbStack) ещё не встал.

### Возможно надо переключиться в ручную, отвязаться от переменной окружения DOCKER_HOST.

```sh
unset DOCKER_HOST
```
#### После проверить

```sh
docker context show
```
    Должен показать orbstack. Затем попробовать 

    ```sh
    docker ps
    ```
    ```sh
    docker run hello-world
    ```

## Создание телеграм-бота на Python

#### Заходим в телеграм и ищем botfather, где создаем нашего тг-бота, добавляем картунку, описание 

  ##### скачиваем последнюю версию python

  ##### создаем директорию telegram-bot

  ##### в этой директории создаем директорию venv для написания кода
  
  ```sh
  brew install pyenv-virtualenv
  ```

  ```sh
  echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
  ```

  ```sh
  source ~/.zshrc
  ```

  ##### Pyenv-virtualenv создает окружения без проблем shims
  
  ```sh
  pyenv virtualenv 3.11.4 venv
  ```

  ##### Если директория не появилась, то это нормально, venv создается в ~/.pyenv/versions/telegram-bot-env/bin/python а если хотите чтобы эта папка была в проекте

  ```sh
  ~/.pyenv/versions/3.11.4/bin/python -m venv venv
  ```
  
   ##### и еще создаем файл main.py

  ##### Устанавливаем библиотеку aiogram в окружении pyenv!

  ```sh
  pip install aiogram
  ```

  #### В main.py вставляем стандартные строки кода

{
    from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import Command


BOT_TOKEN = "8430017466:AAEW71rfyYUZCAiZibHgISVj3w6glwebdNI"


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()



@dp.message(Command("start"))
async def process_start_command(message: Message):
    await message.answer("Hello! I'm your friendly Telegram bot. How can I assist you today?")

async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
}  

#### чтобы выйти из pyvenv

```sh
pyenv deactivate
```
 #### чтобы войти в окружение pyenv

 ```sh
 pyenv activate telegram-bot
 ```        
 
 #### Проверка окружения

 ```sh
 which python
 ```
 ```sh
 pip list | grep aiogram
 ```

 #### Регистрируемся на Sourcecraft.dev и создаем там пустой репозиторий, после создаем персональный ключ доступа


## Основыне команды Linux

#### чтобы проверить сколько памяти осталось на системе

```sh
df
```

#### чтобы посмотреть конкретный mount

```sh
df -h /dev/sda4
```

#### разрешения на системе через chmod, например дать + или забрать - ; также добавить разрешение на запись(w), чтение(r), запуск(x) wrx
    и надо помнить такие значения 'u - user g - group o - other -a all'

```sh
chmod +wrx <название файла>
```

#### сколько RAM %CPU занимает процесс

   
   ```sh
   ps aux # чтобы посмотреть на все процессы на конкретный момент времени
   ```

   ```sh
   htop # чтобы узнать про процесс который занимает очень много памяти и что то тормозит
   ```

   ```sh
   kill <название_или_id_программы> # чтобы закрыть какой нибудь процесс по названию или id программы
   ```

   ```sh
   vmstat # как посмотреть сколько памяти
   ```

   ```sh
   top # посмотерть сколько процессов сейчас работает сколько памяти и прочая информация
   ```

   ```sh
   ps aux | grep <название программы> # можно посмотреть на одну конкретную программу, сколько она занимает памяти и сколько CPU использует
   ```
   
#### Есть самая главная команда, которая покажет всю память, всю информацию про неё

```sh
cat /proc/meminfo
```

#### Если надо узнать сколько памяти занимает hard система или одна папка

```sh
du -sh
```

```sh
du -sh Desktop/
```

#### можно запустить несолько команд в одну линию, если надо открыть сразу несколько директорий и все их сравнить

```sh
ls ; cd ~ ; ls ; cd Desktop ; ls
```

#### узнать больше про любую команду

```sh
man <command>
```

#### как прикрепить mount, нужно смотреть в папке /dev/

```sh
mount # посмотреть все mount
```

```sh
sudo mount /dev/<mount> /home/username/test #  если хочу присоеденить новый mount, делать через sudo
```

```sh
sudo !! # испольнение последней команды с добавление sudo
```

#### Сервисы, которые подсоединяются к интернету и какую либо информацию перезагружают ; как проверить что есть сервис, работает он или не работает, подсоединен ли он к ip адресу

```sh
sudo netstat # если запустить без флагов, то это займет очень много времени
```

```sh
sudo -netstat -tulpn # дает информацию про все сервисы через интернет
```
		
#### как узнать версиб kernel

```sh
uname -a
```

#### как узнать свой ip адрес на Linux

```sh
ifconfig
```
    
```sh
ip addr show # новая команда, даже покажет больше
```

#### найти все файлы на вашем диске с окончанием .c в котором есть слово apple

```sh
find ./ -name "*.c" | xargs grep -i "apple"
```

#### если надо найти файлы с окончание sh

```sh
ls *.sh
```

```sh
ls -al *.sh # чтобы выведена была еще информация
```
######