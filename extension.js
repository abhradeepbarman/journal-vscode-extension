const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { open } = require("fs").promises;
const { exec } = require("child_process");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    // Define the directory and file paths
    const directoryPath = path.join("C:", "journal");
    const filePath = path.join(directoryPath, "daily.txt");

    try {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, {
                recursive: true,
            });
            console.log("Directory created at ", directoryPath);
        }

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `${Date.now()}\n`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File created successfully");
                }
            });
        }

        if (fs.existsSync(filePath)) {
            exec(`notepad ${directoryPath}`, (err) => {
                if (err) {
                    console.error("Failed to open file in VS Code:", err);
                } else {
                    console.log("File opened in VS Code.");
                }
            });
            
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
    const disposable = vscode.commands.registerCommand(
        "journal-vscode.helloWorld",
        function () {
            // The code you place here will be executed every time your command is executed

            // Display a message box to the user
            vscode.window.showInformationMessage(
                "Hello World from journal-vscode!"
            );
        }
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
