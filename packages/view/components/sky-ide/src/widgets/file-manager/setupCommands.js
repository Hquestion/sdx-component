import { addCommand } from '../../utils/commandsHelper';
import { CommandIDs } from '../../config/commands';

export default function setupFileCommands(commands, ctx) {
    addCommand(commands, ctx, CommandIDs.RENAME, async function() {
        this.fileTable.renameFile();
    });
    addCommand(commands, ctx, CommandIDs.DELETE, async function() {
        this.fileTable.removeFile();
    });
    addCommand(commands, ctx, CommandIDs.DOWNLOAD, async function() {
        this.fileTable.downloadFile();
    });
    addCommand(commands, ctx, CommandIDs.COPY, async function() {
        this.fileTable.copyFile();
    });
    addCommand(commands, ctx, CommandIDs.PASTE, async function() {
        this.fileTable.pasteFile();
    });
    addCommand(commands, ctx, CommandIDs.CUT, async function() {
        this.fileTable.cutFile();
    });
}
