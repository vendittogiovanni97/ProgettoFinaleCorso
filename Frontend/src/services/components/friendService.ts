const API_BASE = "/api/friends"; // Change this to your actual backend endpoint

const friendService = {
  getFriends: async (userId: number) => {
    const res = await fetch(`${API_BASE}/list/${userId}`);
    return await res.json();
  },
  getPendingRequests: async (userId: number) => {
    const res = await fetch(`${API_BASE}/requests/${userId}`);
    return await res.json();
  },
  sendRequest: async (userId: number, friendId: number) => {
    const res = await fetch(`${API_BASE}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, friendId }),
    });
    return await res.json();
  },
  acceptRequest: async (requestId: number) => {
    const res = await fetch(`${API_BASE}/accept/${requestId}`, { method: "POST" });
    return await res.json();
  },
  rejectRequest: async (requestId: number) => {
    const res = await fetch(`${API_BASE}/reject/${requestId}`, { method: "POST" });
    return await res.json();
  },
  removeFriend: async (userId: number, friendId: number) => {
    const res = await fetch(`${API_BASE}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, friendId }),
    });
    return await res.json();
  },
};

export default friendService;