# C++ Header File Generator

**C++ Header File Generator** — это расширение для Visual Studio Code, которое автоматически создает заголовочные файлы с объявлениями функций для выбранного `.cpp` файла. Это полезно для упрощения работы с C++ проектами, где вам нужно быстро генерировать заголовочные файлы для исходного кода.

## Возможности

- Генерация заголовочного файла с объявлениями функций из `.cpp` файла.
- Автоматическое копирование директив `#include` из исходного `.cpp` файла.
- Поддержка работы по комбинации клавиш для быстрого создания заголовочного файла.

## Установка расширения
1. Установите [Node.js](https://nodejs.org/) и [Visual Studio Code](https://code.visualstudio.com/).
2. Установите vsce (Visual Studio Code Extension Manager), с помощью команды `npm install -g vsce`.
3. Используйте команду ```vsce package``` для генерации .vsix файла.
4. Для запуска в VS Code перейдите в расширения (Extensions) на боковой панели.
Нажмите на три точки в правом верхнем углу и выберите Install from VSIX.
Выберите сгенерированный .vsix файл.

## Использование
1. Откройте .cpp файл, для которого нужно создать заголовочный файл.
2. Запустите команду Create Header File одним из следующих способов:
    Откройте Command Palette (нажмите Ctrl+Shift+P), введите Create Header File и выберите команду.
    Используйте комбинацию клавиш, если она настроена для этой команды (по умолчанию ctrl+alt+h).
    Заголовочный файл будет создан в той же директории с именем, совпадающим с .cpp файлом, но с расширением .h.

## Пример работы
Исходный файл:
```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

void printMessage(std::string message) {
    std::cout << message << std::endl;
}
```
Сгенерированный .h файл:
```cpp
#include <iostream>

int add(int a, int b);
void printMessage(std::string message);
```

## Конфигурация
Плагин можно настроить изменив сочетание клавиш для запуска в package.json.
```json
{
    "key": "ctrl+alt+h",
    "command": "extension.createHeaderFile",
    "when": "editorTextFocus"
}
```

