import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        shop: "Shop",
        categories: "Categories",
        about: "About",
        contact: "Contact",
        admin: "Admin",
        login: "Login",
        signup: "Sign Up",
        search: "Search products..."
      },
      categories: {
        all: "All Products",
        newArrivals: "New Arrivals",
        electronics: "Electronics",
        homeGoods: "Home Goods",
        apparel: "Apparel"
      },
      userMenu: {
        account: "My Account",
        dashboard: "Dashboard",
        signOut: "Sign Out"
      },
      hero: {
        title: "Elevate Your Lifestyle",
        subtitle: "Discover our premium collection of curated products designed for modern living.",
        shopNow: "Shop Now"
      },
      cart: {
        title: "Shopping Cart",
        empty: "Your cart is empty",
        subtotal: "Subtotal",
        checkout: "Proceed to Checkout",
        total: "Total",
        continue: "Continue Shopping"
      },
      checkout: {
        title: "Checkout",
        billing: "Billing Details",
        summary: "Order Summary",
        placeOrder: "Place Order",
        shipping: "Shipping",
        tax: "Tax (10%)",
        secure: "Secure Payment"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        shop: "Boutique",
        categories: "Catégories",
        about: "À propos",
        contact: "Contact",
        admin: "Admin",
        login: "Connexion",
        signup: "S'inscrire",
        search: "Rechercher des produits..."
      },
      categories: {
        all: "Tous les produits",
        newArrivals: "Nouveautés",
        electronics: "Électronique",
        homeGoods: "Articles ménagers",
        apparel: "Vêtements"
      },
      userMenu: {
        account: "Mon Compte",
        dashboard: "Tableau de bord",
        signOut: "Déconnexion"
      },
      hero: {
        title: "Élevez votre style de vie",
        subtitle: "Découvrez notre collection premium de produits sélectionnés pour la vie moderne.",
        shopNow: "Acheter"
      },
      cart: {
        title: "Panier",
        empty: "Votre panier est vide",
        subtotal: "Sous-total",
        checkout: "Passer à la caisse",
        total: "Total",
        continue: "Continuer les achats"
      },
      checkout: {
        title: "Caisse",
        billing: "Détails de facturation",
        summary: "Résumé de la commande",
        placeOrder: "Passer la commande",
        shipping: "Livraison",
        tax: "Taxe (10%)",
        secure: "Paiement sécurisé"
      }
    }
  },
  am: {
    translation: {
      nav: {
        home: "መነሻ",
        shop: "ሱቅ",
        categories: "ምድቦች",
        about: "ስለ እኛ",
        contact: "አድራሻ",
        admin: "አስተዳዳሪ",
        login: "ግባ",
        signup: "ተመዝገብ",
        search: "ምርቶችን ይፈልጉ..."
      },
      categories: {
        all: "ሁሉም ምርቶች",
        newArrivals: "አዳዲስ ምርቶች",
        electronics: "ኤሌክትሮኒክስ",
        homeGoods: "የቤት ዕቃዎች",
        apparel: "አልባሳት"
      },
      userMenu: {
        account: "የእኔ መለያ",
        dashboard: "ዳሽቦርድ",
        signOut: "ውጣ"
      },
      hero: {
        title: "የአኗኗር ዘይቤዎን ያሳድጉ",
        subtitle: "ለዘመናዊ ኑሮ የተዘጋጁ ልዩ ምርቶችን ያግኙ።",
        shopNow: "አሁን ይግዙ"
      },
      cart: {
        title: "የግዢ ጋሪ",
        empty: "ጋሪዎ ባዶ ነው",
        subtotal: "ንዑስ ድምር",
        checkout: "ወደ ክፍያ ይቀጥሉ",
        total: "ድምር",
        continue: "ግዢዎን ይቀጥሉ"
      },
      checkout: {
        title: "ክፍያ",
        billing: "የክፍያ ዝርዝሮች",
        summary: "የትዕዛዝ ማጠቃለያ",
        placeOrder: "ትዕዛዝ ያስገቡ",
        shipping: "ማጓጓዣ",
        tax: "ግብር (10%)",
        secure: "አስተማማኝ ክፍያ"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
