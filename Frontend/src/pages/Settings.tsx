import { useState } from "react";
import {
  ChevronRight,
  Globe,
  Palette,
  Bell,
  User,
  Lock,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";
import { Divider } from "@mui/material";
import { List } from "@mui/material";

type Tema = "chiaro" | "scuro" | "sistema";
type Lingua = "italiano" | "english" | "français" | "español";

const PaginaLingua = () => {
  const [linguaSelezionata, setLinguaSelezionata] =
    useState<Lingua>("italiano");
  const lingue: Lingua[] = ["italiano", "english", "français", "español"];

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Impostazioni Lingua</h2>
      <div className="space-y-4">
        {lingue.map((lingua) => (
          <div
            key={lingua}
            className={`p-4 rounded-lg cursor-pointer flex items-center justify-between ${
              linguaSelezionata === lingua
                ? "bg-blue-100 dark:bg-blue-900"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => setLinguaSelezionata(lingua)}
          >
            <span className="font-medium">{lingua}</span>
            {linguaSelezionata === lingua && (
              <span className="text-blue-600 dark:text-blue-400">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PaginaTema = () => {
  const [temaSelezionato, setTemaSelezionato] = useState<Tema>("chiaro");
  const temi: { id: Tema; nome: string; descrizione: string }[] = [
    {
      id: "chiaro",
      nome: "Tema Chiaro",
      descrizione: "Tema chiaro con testo scuro",
    },
    {
      id: "scuro",
      nome: "Tema Scuro",
      descrizione: "Tema scuro con testo chiaro",
    },
    {
      id: "sistema",
      nome: "Tema di Sistema",
      descrizione: "Tema basato sulle impostazioni di sistema",
    },
  ];

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Impostazioni Tema</h2>
      <div className="space-y-4">
        {temi.map((tema) => (
          <div
            key={tema.id}
            className={`p-4 rounded-lg cursor-pointer ${temaSelezionato === tema.id ? "bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            onClick={() => setTemaSelezionato(tema.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">{tema.nome}</span>
              {temaSelezionato === tema.id && (
                <span className="text-blue-600 dark:text-blue-400">✓</span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tema.descrizione}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaginaNotifiche = () => {
  const [notificheAttive, setNotificheAttive] = useState(true);
  const [suoniAttivi, setSuoniAttivi] = useState(true);
  const [notificheDisattivate, setNotificheDisattivate] = useState(false);
  const [suoniDisattivati, setSuoniDisattivati] = useState(false);

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6">Impostazioni Notifiche</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="font-medium">Notifiche</span>
          <input
            type="checkbox"
            checked={notificheAttive}
            onChange={() => setNotificheAttive(!notificheAttive)}
            className="toggle toggle-primary"
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="font-medium">Suoni</span>
          <input
            type="checkbox"
            checked={suoniAttivi}
            onChange={() => setSuoniAttivi(!suoniAttivi)}
            className="toggle toggle-primary"
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="font-medium">Disattiva tutte le notifiche</span>
          <input
            type="checkbox"
            checked={notificheDisattivate}
            onChange={() => setNotificheDisattivate(!notificheDisattivate)}
            className="toggle toggle-primary"
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="font-medium">Disattiva suoni</span>
          <input
            type="checkbox"
            checked={suoniDisattivati}
            onChange={() => setSuoniDisattivati(!suoniDisattivati)}
            className="toggle toggle-primary"
          />
        </div>
      </div>
    </div>
  );
};

const PaginaPrivacy = () => (
  <div className="w-full p-6">
    <h2 className="text-2xl font-bold mb-6">Privacy e Sicurezza</h2>
    <p>Modifica le impostazioni relative a privacy e sicurezza.</p>
  </div>
);

const PaginaAssistenza = () => (
  <div className="w-full p-6">
    <h2 className="text-2xl font-bold mb-6">Assistenza</h2>
    <p>Contatta il supporto o consulta le FAQ.</p>
  </div>
);

export default function PaginaImpostazioni() {
  const [paginaAttiva, setPaginaAttiva] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      nome: "Dashboard",
      icona: <LayoutDashboard size={20} />,
    },
    { id: "lingua", nome: "Lingua", icona: <Globe size={20} /> },
    { id: "tema", nome: "Tema", icona: <Palette size={20} /> },
    { id: "notifiche", nome: "Notifiche", icona: <Bell size={20} /> },
    { id: "profilo", nome: "Profilo", icona: <User size={20} /> },
    { id: "privacy", nome: "Privacy", icona: <Lock size={20} /> },
    { id: "assistenza", nome: "Assistenza", icona: <HelpCircle size={20} /> },
  ];

  const renderPagina = () => {
    switch (paginaAttiva) {
      default:
        return <PaginaLingua />;
      case "tema":
        return <PaginaTema />;
      case "notifiche":
        return <PaginaNotifiche />;
      case "privacy":
        return <PaginaPrivacy />;
      case "assistenza":
        return <PaginaAssistenza />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Barra laterale */}
      <Divider
        orientation="vertical"
        flexItem
        textAlign="left"
        sx={{ marginLeft: "0", marginRight: "900px" }}
      >
        <List>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold">Impostazioni</h1>
          </div>
          <nav className="mt-4">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex items-center w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      paginaAttiva === item.id
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : ""
                    }`}
                    onClick={() => setPaginaAttiva(item.id)}
                  >
                    <span className="mr-3">{item.icona}</span>
                    {item.nome}
                    <ChevronRight size={16} className="ml-auto" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </List>
      </Divider>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ marginLeft: "400px", textAlign: "center" }}
      >
        {/* Contenuto principale */}
        <div className="flex-1 overflow-y-auto">{renderPagina()}</div>
      </Divider>
    </div>
  );
}
