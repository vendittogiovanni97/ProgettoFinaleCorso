import React, { useEffect, useState } from "react";
import * as S from "../styled/AmiciPageStyled";
import { People, PersonAdd, Search, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import friendService from "../services/components/friendService";
import userService  from "../services/components/userService";
import { User, FriendRequest} from "../types/components/typesAmici" // <-- importa il tipo FriendReques
// Replace with actual user context or auth
const CURRENT_USER_ID = 1;

const Amici: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "search">("friends");
  const [message, setMessage] = useState<string>("");

  // Fetch friends and requests on mount
  useEffect(() => {
    fetchFriends();
    fetchRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const res = await friendService.getFriends(CURRENT_USER_ID);
      if (res.success) setFriends(res.data);
      else setFriends([]);
    } catch {
      setFriends([]);
      setMessage("Errore nel caricamento amici");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await friendService.getPendingRequests(CURRENT_USER_ID);
      if (res.success) setRequests(res.data);
      else setRequests([]);
    } catch {
      setRequests([]);
      setMessage("Errore nel caricamento richieste");
    }
  };

  // Search users
  const handleSearch = async () => {
    setHasSearched(true);
    if (search.trim()) {
      const res = await userService.searchUsers(search, CURRENT_USER_ID); // <-- aggiornata
      if (res.success) setSearchResults(res.data);
      else setSearchResults([]);
    } else {
      setSearchResults([]);
    }
  };

  // Send friend request
  const handleSendRequest = async (friendId: number) => {
    const res = await friendService.sendRequest(CURRENT_USER_ID, friendId);
    setMessage(res.message || "Richiesta inviata!");
    fetchRequests();
  };

  // Accept friend request
  const handleAccept = async (requestId: number) => {
    const res = await friendService.acceptRequest(requestId);
    setMessage(res.message || "Richiesta accettata!");
    fetchFriends();
    fetchRequests();
  };

  // Reject friend request
  const handleReject = async (requestId: number) => {
    const res = await friendService.rejectRequest(requestId);
    setMessage(res.message || "Richiesta rifiutata!");
    fetchRequests();
  };

  // Remove friend
  const handleRemoveFriend = async (friendId: number) => {
    const res = await friendService.removeFriend(CURRENT_USER_ID, friendId);
    setMessage(res.message || "Amico rimosso!");
    fetchFriends();
  };

  return (
    <S.AmiciPageContainer>
      <S.AmiciDrawer>
        <S.AmiciDrawerTitle>Amici</S.AmiciDrawerTitle>
        <S.AmiciDrawerList>
          <S.AmiciDrawerItem $selected={activeTab === "friends"} onClick={() => setActiveTab("friends")}>
            <People style={{ marginRight: 8 }} /> I tuoi amici
          </S.AmiciDrawerItem>
          <S.AmiciDrawerItem $selected={activeTab === "requests"} onClick={() => setActiveTab("requests")}>
            <PersonAdd style={{ marginRight: 8 }} /> Richieste
          </S.AmiciDrawerItem>
          <S.AmiciDrawerItem $selected={activeTab === "search"} onClick={() => setActiveTab("search")}>
            <Search style={{ marginRight: 8 }} /> Cerca utenti
          </S.AmiciDrawerItem>
          <S.AmiciDrawerItem onClick={() => navigate('/dashboard')}>
            <Home style={{ marginRight: 8 }} /> Home
          </S.AmiciDrawerItem>
        </S.AmiciDrawerList>
      </S.AmiciDrawer>
      <S.AmiciMain>
        {activeTab === "friends" && (
          <>
            <S.AmiciSectionTitle>I tuoi amici</S.AmiciSectionTitle>
            <S.AmiciList>
              {friends && friends.length > 0 ? (
                friends.map((friend) => (
                  <S.AmiciListItem key={friend.id}>
                    {friend.username || friend.name}
                    <S.AmiciButton onClick={() => handleRemoveFriend(friend.id)}>Rimuovi</S.AmiciButton>
                  </S.AmiciListItem>
                ))
              ) : (
                <li>Nessun amico trovato</li>
              )}
            </S.AmiciList>
          </>
        )}
        {activeTab === "requests" && (
          <>
            <S.AmiciSectionTitle>Richieste di amicizia</S.AmiciSectionTitle>
            <S.AmiciList>
              {requests.map((req) => (
                <S.AmiciListItem key={req.id}>
                  {req.user.username}
                  <div>
                    <S.AmiciButton style={{ marginRight: 8 }} onClick={() => handleAccept(req.id)}>Accetta</S.AmiciButton>
                    <S.AmiciButton onClick={() => handleReject(req.id)}>Rifiuta</S.AmiciButton>
                  </div>
                </S.AmiciListItem>
              ))}
            </S.AmiciList>
          </>
        )}
        {activeTab === "search" && (
          <>
            <S.AmiciSectionTitle>Cerca utenti</S.AmiciSectionTitle>
            <S.AmiciSearchContainer>
              <S.AmiciSearchInput
                placeholder="Cerca utenti..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <S.AmiciButton onClick={handleSearch}>Cerca</S.AmiciButton>
            </S.AmiciSearchContainer>
            <S.AmiciList>
              {hasSearched && searchResults.length === 0 ? (
                <li>Nessun utente trovato</li>
              ) : (
                searchResults.map((user) => (
                  <S.AmiciListItem key={user.id}>
                    {user.username}
                    <S.AmiciButton onClick={() => handleSendRequest(user.id)}>Aggiungi</S.AmiciButton>
                  </S.AmiciListItem>
                ))
              )}
            </S.AmiciList>
          </>
        )}
        {message && <div>{message}</div>}
      </S.AmiciMain>
    </S.AmiciPageContainer>
  );
};

export default Amici;


