import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.CreateHeaderFile', async () => {
        // Получаем текущий активный файл
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('Нет открытого файла для создания заголовочного файла.');
            return;
        }

        const filePath = editor.document.fileName;

        // Проверяем, что файл имеет расширение .cpp
        if (path.extname(filePath) !== '.cpp') {
            vscode.window.showErrorMessage('Пожалуйста, выберите .cpp файл.');
            return;
        }

        const fileContent = editor.document.getText();
        // Ищем директивы #include
        const includeRegex = /#include\s+<[^>]+>/g;
        const includes = fileContent.match(includeRegex) || [];
        // Ищем функции
        const functionRegex = /([a-zA-Z_][a-zA-Z0-9_:\s*&]+)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g;
        const declarations: string[] = [];
        let match;

        while ((match = functionRegex.exec(fileContent)) !== null) {
            // Удаляем лишние пробелы с обеих сторон строк
			const returnType = match[1].trim();
            const functionName = match[2].trim();
            const parameters = match[3].trim();

            // Создаем строку для объявления функции
            const declaration = `${returnType} ${functionName}(${parameters});`;
            declarations.push(declaration);
        }

        if (declarations.length === 0) {
            vscode.window.showWarningMessage('Не найдено функций для объявления.');
            return;
        }

        // Создаем заголовочный файл
        const headerFilePath = filePath.replace(/\.cpp$/, '.h');
        const headerFileContent = [
            ...includes,
            '',
            ...declarations,
            ''
        ].join('\n');

        // Записываем файл
        fs.writeFile(headerFilePath, headerFileContent, (err) => {
            if (err) {
                vscode.window.showErrorMessage('Ошибка при создании заголовочного файла.');
                return;
            }
            vscode.window.showInformationMessage(`Заголовочный файл создан: ${headerFilePath}`);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
