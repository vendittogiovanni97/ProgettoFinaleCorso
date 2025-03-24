import React from "react";
import { useParams } from "react-router-dom";
import { ProfilePageParams } from "../types/components/typesProfilePage";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<ProfilePageParams>();

  // Qui puoi fare una chiamata API per ottenere i dettagli dell'utente
  // in base all'ID (userId).

  return (
    <div>
      <h1>Profilo di {userId}</h1>
      {/* Mostra i dettagli del profilo qui */}
      <p>ID utente: {userId}</p>
    </div>
  );
};

export default ProfilePage;
