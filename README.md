# Документация проекта "Билетный оператор"

## Описание проекта

Проект "Билетный оператор" представляет собой систему управления билетами для билетного оператора. Он позволяет создавать, просматривать, обновлять и удалять билеты через API.

## Установка и запуск

1. Установите Node.js и MongoDB на вашем компьютере.
2. Клонируйте репозиторий проекта: `git clone https://github.com/your/repository.git`
3. Перейдите в каталог проекта: `cd ticket-operator`
4. Установите зависимости: `npm install`
5. Запустите сервер: `node index.js`

## Использование API

### Создание билета

```
POST /tickets

Request Body:
{
  "destination": "Название пункта назначения",
  "price": Цена билета
}
```

### Получение всех билетов

```
GET /tickets
```

### Получение билета по ID

```
GET /tickets/:id
```

### Обновление билета по ID

```
PUT /tickets/:id

Request Body:
{
  "destination": "Новое название пункта назначения",
  "price": Новая цена билета
}
```

### Удаление билета по ID

```
DELETE /tickets/:id
```

## Примеры ответов

- Успешный ответ (статус 200):

```
{
  "_id": "60ee5e9c55c5e359f0f287ab",
  "destination": "Нью-Йорк",
  "price": 200
}
```

- Ошибка 404:

```
Билет не найден
```

- Ошибка 500:

```
Ошибка при создании билета
```

## Схема данных билета

- `destination`: Название пункта назначения (String)
- `price`: Цена билета (Number)
- `date`: Дата создания билета (Date)