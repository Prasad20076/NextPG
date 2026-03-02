export const BASE_URL = "https://nextpg-backend.onrender.com/api/pgs";


// ==========================
// GET ALL PGs (Search + Filter)
// ==========================
export const getPGs = async (filters = {}) => {
  try {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    const query = new URLSearchParams(cleanFilters).toString();

    const response = await fetch(
      query ? `${BASE_URL}?${query}` : BASE_URL
    );

    if (!response.ok) {
      throw new Error("Failed to fetch PGs");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching PGs:", error);
  }
};


// ==========================
// GET SINGLE PG
// ==========================
export const getSinglePG = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch PG");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching single PG:", error);
  }
};


// ==========================
// CREATE PG
// ==========================
export const createPG = async (pgData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pgData)
    });

    if (!response.ok) {
      throw new Error("Failed to create PG");
    }

    return await response.json();

  } catch (error) {
    console.error("Error creating PG:", error);
  }
};


// ==========================
// UPDATE PG
// ==========================
export const updatePG = async (id, pgData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pgData)
    });

    if (!response.ok) {
      throw new Error("Failed to update PG");
    }

    return await response.json();

  } catch (error) {
    console.error("Error updating PG:", error);
  }
};


// ==========================
// DELETE PG
// ==========================
export const deletePG = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete PG");
    }

    return await response.json();

  } catch (error) {
    console.error("Error deleting PG:", error);
  }
};