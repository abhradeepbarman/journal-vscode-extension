const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    const directoryPath = path.join("C:", "journal");
    const filePath = path.join(directoryPath, "journal.txt");

    try {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, {
                recursive: true,
            });
            console.log("Directory created at ", directoryPath);
        }

        if (!fs.existsSync(filePath)) {
            const content = "✨ Start your Journaling Here! ✨\n";
            fs.writeFileSync(filePath, content, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File created successfully");
                }
            });
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }

    const disposable = vscode.commands.registerCommand(
        "journal-vscode.journal",
        async function () {
            const currentDate = new Date().toLocaleString();

            try {
                if (fs.existsSync(filePath)) {
                    fs.appendFile(filePath, `\n${currentDate} ⌚\n`, async(err) => {
                        if (err) {
                            vscode.window.showErrorMessage(
                                "Error writing to the file"
                            );
                            return;
                        }

                        const doc = await vscode.workspace.openTextDocument(filePath);
                        await vscode.window.showTextDocument(doc)
                    });
                }
            } catch (error) {
                console.log(error);
            }
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
