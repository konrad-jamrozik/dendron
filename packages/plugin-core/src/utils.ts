import os from "os";
import * as vscode from "vscode";

// === File FUtils
export function resolveTilde(filePath: string) {
  if (!filePath || typeof filePath !== "string") {
    return "";
  }
  // '~/folder/path' or '~'
  if (filePath[0] === "~" && (filePath[1] === "/" || filePath.length === 1)) {
    return filePath.replace("~", os.homedir());
  }
  return filePath;
}

export function getPlatform() {
  return process.platform;
}


export class FileUtils {
  static escape(fpath: string) {
    return fpath.replace(/(\s+)/g, '\\$1');
  }
}

export class VSCodeUtils {

  static getActiveTextEditor() {
    return vscode.window.activeTextEditor;
  }

  static getFsPathFromTextEditor(editor: vscode.TextEditor) {
    return editor.document.uri.fsPath;
  }

  static getWorkspaceFolders(getRoot?: boolean): readonly vscode.WorkspaceFolder[] | vscode.WorkspaceFolder| undefined {
    const wsFolders = vscode.workspace.workspaceFolders;
    if (getRoot) {
      return wsFolders![0];
    } else {
      return wsFolders;
    }
  }

  static async openWS(wsFile: string) {
    return vscode.commands
      .executeCommand(
        "vscode.openFolder",
        vscode.Uri.parse(wsFile)
      );
  }
  static isDebuggingExtension(): boolean {
    return process.env.VSCODE_DEBUGGING_EXTENSION ? true : false;
  }
}