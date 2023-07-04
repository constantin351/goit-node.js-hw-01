const operations = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

  program.parse(process.argv);

  const argv = program.opts();

  async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        const contactListArr = await operations.listContacts();
        console.table(contactListArr);
        break;
  
      case 'get':
        const contactById = await operations.getContactById(id);
        if (!contactById) {
            console.log(`Contact with ${id} was not found`)
        }
        console.log(contactById);
        break;
  
      case 'add':
        const addedContact = await operations.addContact(name, email, phone);
        console.log(addedContact);
        break;
  
      case 'remove':
        const removedContact = await operations.removeContact(id);
        if (!removedContact) {
            console.log(`Contact with ${id} was not found to delete it`);
        }
        console.log(removedContact);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  };
  
  invokeAction(argv);