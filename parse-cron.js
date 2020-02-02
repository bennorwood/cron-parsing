#!/usr/bin/env node

(async () => {
    const COMMAND_INDEX = 2;

    await exec();
    return;

    async function exec() {
        const input = await getInput();
        const rawCommands = input.split(`\n`);
        if(rawCommands.length < 1) {
            console.log(`Not enough input, exiting`);
            return;
        }

        const commands = tokenize(rawCommands);

        commands.forEach((command, index) => {
            if(!command) {
                console.log(`Input at this line is not valid: ${rawCommands[index]}`);
                return;
            }

            console.log(processCommand(command));
        })
    }

    function processCommand(command) {
        const currentDate = new Date();
        const CURRENT_HOUR = currentDate.getHours();
        const CURRENT_MINUTE = currentDate.getMinutes();
        const COMMAND_MINUTE = (command[0] !== `*`) ? command[0] : CURRENT_MINUTE;
        const COMMAND_HOUR = (command[1] !== `*`) ? command[1] : CURRENT_HOUR;
        const COMMAND_EXEC = command[command.length - 1]

        const dayText = ( CURRENT_HOUR <= COMMAND_HOUR && CURRENT_MINUTE <= COMMAND_MINUTE ) ? `today` : `tomorrow`;
        return `${COMMAND_HOUR}:${COMMAND_MINUTE} ${dayText} - ${COMMAND_EXEC}`;
    }

    function tokenize(commands) {
        return commands.map(element => {
            const tokens = element.split(` `);
            return isValidCommand(tokens) ? tokens : null;
        });
    }

    function isValidCommand(tokenizedCommand) {
        let isValid = tokenizedCommand.length === 3;
        tokenizedCommand.forEach((element, index) => {
            if (index < COMMAND_INDEX) {
                isValid = isValid && isValidCronParameter(element, index);
            }
        });

        return isValid;
    }

    function isValidCronParameter(token, arg_idx) {
        const additionalArgValidationMapping = {
            0: isValidMinutes,
            1: isValidHours
        };

        return token === `*` || ( !Number.isNaN(token) &&
                additionalArgValidationMapping[arg_idx](parseInt(token)) );
    }

    function isValidHours(token) {
        return token < 24 && token >= 0;
    }

    function isValidMinutes(token) {
        return token < 60 && token >= 0;
    }

    function getInput() {
        return new Promise((resolve, reject) => {
            const stdin = process.stdin;
            let data = ``;

            stdin.setEncoding(`utf8`);

            stdin.on(`data`, function (chunk) {
                data += chunk;
            });

            stdin.on(`end`, function () {
                resolve(data);
            });

            stdin.on(`error`, reject);
        });
    }
})();