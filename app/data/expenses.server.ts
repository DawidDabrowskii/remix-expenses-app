import { MongoClient, ObjectId } from "mongodb";

// Connection URL from environment variable
const url = process.env.DATABASE_URL || "mongodb://localhost:27017";
const dbName = "remix-expenses";

export type Expense = {
  id?: string;
  title: string;
  amount: number;
  date: Date;
  dateAdded?: Date;
};

let client: MongoClient;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  return client.db(dbName);
}

export async function addExpense(expenseData: Expense) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Expense");

    const result = await collection.insertOne({
      title: expenseData.title,
      amount: expenseData.amount,
      date: expenseData.date,
      dateAdded: new Date(),
    });

    return {
      ...expenseData,
      id: result.insertedId.toString(),
      dateAdded: new Date(),
    };
  } catch (error) {
    console.error("Failed to add expense:", error);
    throw new Error("Failed to add expense");
  }
}

export async function getExpenses() {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Expense");

    const expenses = await collection
      .find({})
      .sort({ dateAdded: -1 })
      .toArray();

    return expenses.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      amount: doc.amount,
      date: doc.date,
      dateAdded: doc.dateAdded,
    }));
  } catch (error) {
    console.error("Failed to get expenses:", error);
    throw new Error("Failed to get expenses");
  }
}

export async function getExpense(id: string) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Expense");

    const expense = await collection.findOne({ _id: new ObjectId(id) });

    if (!expense) {
      throw new Error(`Expense with ID ${id} not found`);
    }

    return {
      ...expense,
      id: expense._id.toString(),
    };
  } catch (error) {
    console.error(`Failed to get expense with ID ${id}:`, error);
    throw new Error(`Failed to get expense with ID ${id}`);
  }
}

export async function updateExpense(id: string, expenseData: Partial<Expense>) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Expense");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: expenseData.title,
          amount: expenseData.amount,
          date: expenseData.date,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error(`Failed to update expense with ID ${id}:`, error);
    throw new Error(`Failed to update expense with ID ${id}`);
  }
}

export async function deleteExpense(id: string) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Expense");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete expense with ID ${id}:`, error);
    throw new Error(`Failed to delete expense with ID ${id}`);
  }
}
