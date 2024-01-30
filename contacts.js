const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.promises.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        if (contacts.length === 0) {
            console.log("No contacts available.");
        } else {
            console.table(contacts);
        }
        // console.table(contacts);
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
    }

    async function getContactById(contactId) {
    try {
        const data = await fs.promises.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const contact = contacts.find(({ id }) => id === contactId);

        if (!contact) {
            console.log("There is no such user");
            return null;
        }

        console.table(contact);
        return contact;
    } catch (error) {
        console.log(error.message);
    }
    }

    async function removeContact(contactId) {
    try {
        const data = await fs.promises.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const newContacts = contacts.filter(({ id }) => id !== contactId);

        await fs.promises.writeFile(
        contactsPath,
        JSON.stringify(newContacts, null, 2)
        );

        console.table(newContacts);
        return newContacts;
    } catch (error) {
        console.log(error.message);
    }
    }

    async function addContact(name, email, phone) {
    try {
        const data = await fs.promises.readFile(contactsPath, "utf8");
        const contacts = JSON.parse(data);
        const newContact = { id: uuidv4(), name, email, phone };
        const newContacts = [...contacts, newContact];

        await fs.promises.writeFile(
        contactsPath,
        JSON.stringify(newContacts, null, 2)
        );

        console.table(newContacts);
        return newContacts;
    } catch (error) {
        console.log(error.message);
    }
};

    module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
