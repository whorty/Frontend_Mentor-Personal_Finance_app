import supabase from "../supabase-client";

export async function fetchBalance() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Balance")
      .select();
    if (error) {
      throw new Error("Error fetching data:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

export async function fetchTransactions() {
  try {
    const { data, error } = await supabase
      .from("Personal_Finance_App-Transactions")
      .select();
    if (error) {
      throw new Error("Error fetching data:", error);
    }
    return data;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}
