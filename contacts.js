const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path"); 

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
    try {
        const contactsJson = await fs.readFile(contactsPath);
        const contactsArr = JSON.parse(contactsJson);
        return contactsArr;
    } catch (error) {
        console.log(error);
    }
};

  
async function getContactById(contactId) {
    try {
        const contactsArr = await listContacts();
        const contactFoundById = contactsArr.find(contact => contact.id === contactId)

        if (!contactFoundById) return null;

        return contactFoundById;
    } catch (error) {
        console.log(error);
    }
};


async function addContact(name, email, phone) {
    try {
        const contactsArr = await listContacts();
        const addedContact = {name, email, phone, id: nanoid()};
        contactsArr.push(addedContact);

        await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

        return addedContact;
    } catch (error) {
        console.log(error);
    }
};


async function removeContact(contactId) {
    try {
        const contactsArr = await listContacts();
        const index = contactsArr.findIndex(contact => contact.id === contactId);

        if (index === -1) return null;

        const [removedContact] = contactsArr.splice(index, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

        return removedContact; 
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};