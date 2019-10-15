import { addCommand } from '../../utils/commandsHelper';
import {CommandIDs} from '../../config/commands';

export default function setupDocCommands(commands, ctx) {
    addCommand(commands, ctx, CommandIDs.SAVE_DOC, async function() {
        this.saveCurrent();
    });
}
