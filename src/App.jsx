import { useMemo, useState } from "react";
import "./App.css";

const today = new Date().toISOString().split("T")[0];

const categories = [
  "Barchasi",
  "Milliy taomlar",
  "Kaboblar",
  "Salatlar",
];

const menuItems = [
  {
    id: 1,
    name: "Milliy palov",
    category: "Milliy taomlar",
    price: 50000,
    description: "An’anaviy usulda tayyorlangan xushbo‘y palov.",
    emoji: "🍛",
  },
  {
    id: 2,
    name: "Maxsus kabob",
    category: "Kaboblar",
    price: 70000,
    description: "Ko‘mirda pishirilgan shirali go‘sht.",
    emoji: "🍢",
  },
  {
    id: 3,
    name: "Sezar salati",
    category: "Salatlar",
    price: 35000,
    description: "Yangi sabzavotlar va maxsus sous.",
    emoji: "🥗",
  },
  {
    id: 4,
    name: "Lag‘mon",
    category: "Milliy taomlar",
    price: 45000,
    description: "Uy usulida tayyorlangan mazali lag‘mon.",
    emoji: "🍜",
  },
  {
    id: 5,
    name: "Toshkent shashligi",
    category: "Kaboblar",
    price: 65000,
    description: "Yumshoq go‘sht va maxsus ziravorlar.",
    emoji: "🥩",
  },
  {
    id: 6,
    name: "Achichuk salati",
    category: "Salatlar",
    price: 25000,
    description: "Pomidor, piyoz va yangi ko‘katlar.",
    emoji: "🥒",
  },
  {
    id: 7,
    name: "Mastava",
    category: "Milliy taomlar",
    price: 30000,
    description: "Issiq va mazali milliy sho‘rva.",
    emoji: "🍲",
  },
  {
    id: 8,
    name: "Qanotcha",
    category: "Kaboblar",
    price: 55000,
    description: "Maxsus sousda tayyorlangan tovuq qanotlari.",
    emoji: "🍗",
  },
];

const tables = [
  {
    id: 1,
    name: "Stol 1",
    type: "Oddiy",
    capacity: 2,
    status: "available",
  },
  {
    id: 2,
    name: "Stol 2",
    type: "Oilaviy",
    capacity: 6,
    status: "reserved",
  },
  {
    id: 3,
    name: "Stol 3",
    type: "VIP",
    capacity: 8,
    status: "available",
  },
  {
    id: 4,
    name: "Stol 4",
    type: "Oilaviy",
    capacity: 6,
    status: "available",
  },
  {
    id: 5,
    name: "Stol 5",
    type: "Oddiy",
    capacity: 2,
    status: "reserved",
  },
  {
    id: 6,
    name: "Stol 6",
    type: "Premium",
    capacity: 10,
    status: "available",
  },
  {
    id: 7,
    name: "Stol 7",
    type: "Oilaviy",
    capacity: 8,
    status: "available",
  },
  {
    id: 8,
    name: "Stol 8",
    type: "Oddiy",
    capacity: 4,
    status: "available",
  },
  {
    id: 9,
    name: "Stol 9",
    type: "VIP",
    capacity: 12,
    status: "reserved",
  },
  {
    id: 10,
    name: "Stol 10",
    type: "Premium",
    capacity: 10,
    status: "available",
  },
  {
    id: 11,
    name: "Stol 11",
    type: "Oddiy",
    capacity: 4,
    status: "available",
  },
  {
    id: 12,
    name: "Stol 12",
    type: "Premium",
    capacity: 10,
    status: "available",
  },
];

const initialBooking = {
  name: "",
  phone: "",
  date: "",
  time: "",
  comment: "",
};

function formatPrice(price) {
  return new Intl.NumberFormat("uz-UZ").format(price);
}

export default function App() {
  const [category, setCategory] = useState("Barchasi");

  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState("Barcha sig‘imlar");
  const [tableType, setTableType] = useState("Barchasi");

  const [booking, setBooking] = useState(initialBooking);

  const filteredMenu = useMemo(() => {
    if (category === "Barchasi") {
      return menuItems;
    }

    return menuItems.filter(
      (item) => item.category === category
    );
  }, [category]);

  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const capacityMatch =
        guestCount === "Barcha sig‘imlar" ||
        table.capacity >= Number(guestCount);

      const typeMatch =
        tableType === "Barchasi" ||
        table.type === tableType;

      return capacityMatch && typeMatch;
    });
  }, [guestCount, tableType]);

  function openBooking() {
    setBookingOpen(true);
    setStep(1);
  }

  function closeBooking() {
    setBookingOpen(false);
    setStep(1);
    setSelectedTable(null);
    setGuestCount("Barcha sig‘imlar");
    setTableType("Barchasi");
    setBooking(initialBooking);
  }

  function changeBooking(event) {
    const { name, value } = event.target;

    setBooking((oldBooking) => ({
      ...oldBooking,
      [name]: value,
    }));
  }

  function submitBooking(event) {
    event.preventDefault();

    if (!selectedTable) {
      alert("Avval stol tanlang.");
      return;
    }

    if (
      !booking.name.trim() ||
      !booking.phone.trim() ||
      !booking.date ||
      !booking.time
    ) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring.");
      return;
    }

    if (booking.date < today) {
      alert("O‘tgan sanani tanlash mumkin emas.");
      return;
    }

    const orderData = {
      name: booking.name.trim(),
      phone: booking.phone.trim(),
      date: booking.date,
      time: booking.time,
      comment: booking.comment.trim(),
      table: selectedTable.name,
      tableType: selectedTable.type,
      capacity: selectedTable.capacity,
      source: "telegram_web_app",
      createdAt: new Date().toISOString(),
    };

    console.log("Yuborilayotgan bron ma’lumotlari:", orderData);

    const telegram = window.Telegram?.WebApp;

    if (!telegram) {
      alert(
        "Sayt Telegram WebApp orqali ochilmagan. " +
          "Telegram bot ichidagi «🍽 Restoranni ochish» tugmasini bosing."
      );

      console.error(
        "window.Telegram.WebApp topilmadi."
      );

      return;
    }

    if (typeof telegram.sendData !== "function") {
      alert(
        "Telegram ma’lumot yuborish funksiyasi topilmadi."
      );

      console.error(
        "telegram.sendData mavjud emas:",
        telegram
      );

      return;
    }

    try {
      telegram.ready();
      telegram.expand();

      const jsonData = JSON.stringify(orderData);

      console.log(
        "Telegramga yuborilayotgan JSON:",
        jsonData
      );

      telegram.sendData(jsonData);

      /*
        sendData() muvaffaqiyatli chaqirilgandan keyin
        Telegram WebApp yopiladi.
        Bot foydalanuvchining chatiga javob yuboradi.
      */
      telegram.close();
    } catch (error) {
      console.error(
        "Telegramga ma’lumot yuborishda xatolik:",
        error
      );

      alert(
        "Bron ma’lumotlari yuborilmadi. Qaytadan urinib ko‘ring."
      );
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container navbar">
          <a href="#home" className="logo">
            RESTAURANT<span>.</span>
          </a>

          <nav className="nav-links">
            <a href="#home">Bosh sahifa</a>
            <a href="#about">Biz haqimizda</a>
            <a href="#menu">Menyu</a>
            <a href="#contact">Aloqa</a>
          </nav>

          <button
            className="header-button"
            onClick={openBooking}
          >
            Joy bron qilish
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay">
            <div className="container hero-content">
              <p className="eyebrow">
                RESTAURANT EXPERIENCE
              </p>

              <h1>
                Mazali taomlar,
                <br />
                <span>yoqimli lahzalar</span>
              </h1>

              <p className="hero-text">
                Milliy va zamonaviy taomlarning o‘ziga xos
                uyg‘unligi. Har bir mehmonimiz uchun
                unutilmas ta’m va qulay muhit.
              </p>

              <div className="hero-actions">
                <a href="#menu" className="primary-button">
                  Menyuni ko‘rish
                </a>

                <button
                  className="secondary-button"
                  onClick={openBooking}
                >
                  Joy bron qilish
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">BIZ HAQIMIZDA</p>

              <h2>
                Har bir taomda
                <br />
                <span>mehr va sifat</span>
              </h2>

              <p className="section-text">
                Restaurant — mazali taomlar, qulay muhit
                va samimiy xizmat uyg‘unlashgan restoran.
              </p>

              <a href="#contact" className="text-link">
                Biz bilan bog‘lanish →
              </a>
            </div>

            <div className="about-card">
              <div className="about-card-icon">✦</div>

              <h3>Yuqori sifat</h3>

              <p>
                Faqat yangi va sifatli mahsulotlardan
                foydalanishga e’tibor qaratamiz.
              </p>
            </div>
          </div>
        </section>

        <section className="menu section" id="menu">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MAZALI TANLOV</p>

              <h2>
                Bizning <span>menyu</span>
              </h2>

              <p className="section-text">
                O‘zingizga yoqqan taomni tanlang.
              </p>
            </div>

            <div className="category-buttons">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "active" : ""
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <article
                  className="menu-card"
                  key={item.id}
                >
                  <div className="food-image">
                    {item.emoji}
                  </div>

                  <div className="menu-card-content">
                    <p className="food-category">
                      {item.category}
                    </p>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <strong className="food-price">
                      {formatPrice(item.price)} so‘m
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section section">
          <div className="container booking-banner">
            <div>
              <p className="eyebrow">
                OLDINDAN JOY TANLANG
              </p>

              <h2>
                Restoranda o‘zingizga
                <br />
                <span>mos joyni band qiling</span>
              </h2>

              <p>
                Oddiy, oilaviy, VIP va Premium joylardan
                birini tanlang.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={openBooking}
            >
              Restoran xaritasini ochish
            </button>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contact-box">
            <div>
              <p className="eyebrow">ALOQA</p>

              <h2>Biz sizni kutamiz</h2>

              <p>
                Mazali taomlar va yoqimli muhit uchun
                restoranimizga tashrif buyuring.
              </p>
            </div>

            <div className="contact-info">
              <p>📍 Sizning shahringiz</p>
              <p>📞 +998 90 000 00 00</p>
              <p>🕒 Har kuni 09:00–22:00</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © 2026 Restaurant. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </footer>

      {bookingOpen && (
        <div
          className="modal-overlay"
          onClick={closeBooking}
        >
          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={closeBooking}
            >
              ×
            </button>

            <div className="booking-steps">
              <span className={step >= 1 ? "active" : ""}>
                1. Stol
              </span>

              <span className={step >= 2 ? "active" : ""}>
                2. Ma’lumot
              </span>

              <span className={step >= 3 ? "active" : ""}>
                3. Yakun
              </span>
            </div>

            {step === 1 && (
              <>
                <div className="modal-heading">
                  <p className="eyebrow">
                    JOY TANLASH
                  </p>

                  <h2>Restoran xaritasi</h2>

                  <p>
                    O‘zingizga mos joyni tanlang.
                  </p>
                </div>

                <div className="booking-filters">
                  <label>
                    Mehmonlar soni

                    <select
                      value={guestCount}
                      onChange={(event) => {
                        setGuestCount(event.target.value);
                        setSelectedTable(null);
                      }}
                    >
                      <option value="Barcha sig‘imlar">
                        Barcha sig‘imlar
                      </option>

                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        12,
                      ].map((count) => (
                        <option
                          value={count}
                          key={count}
                        >
                          {count} kishilik
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Joy turi

                    <select
                      value={tableType}
                      onChange={(event) => {
                        setTableType(event.target.value);
                        setSelectedTable(null);
                      }}
                    >
                      {[
                        "Barchasi",
                        "Oddiy",
                        "Oilaviy",
                        "VIP",
                        "Premium",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="map-legend">
                  <span>🟢 Bo‘sh</span>
                  <span>🔴 Band</span>
                  <span>🟡 Tanlangan</span>
                </div>

                <div className="restaurant-map">
                  <div className="entrance">
                    KIRISH
                  </div>

                  <div className="tables-grid">
                    {filteredTables.map((table) => {
                      const isReserved =
                        table.status === "reserved";

                      const isSelected =
                        selectedTable?.id === table.id;

                      return (
                        <button
                          key={table.id}
                          type="button"
                          disabled={isReserved}
                          className={`table-card ${
                            isReserved ? "reserved" : ""
                          } ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() =>
                            setSelectedTable(table)
                          }
                        >
                          <strong>{table.name}</strong>

                          <small>
                            {table.type} joy
                          </small>

                          <small>
                            {table.capacity} kishilik
                          </small>

                          <b>
                            {isReserved
                              ? "Band"
                              : isSelected
                              ? "Tanlandi"
                              : "Bo‘sh"}
                          </b>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedTable && (
                  <div className="selected-table-info">
                    <h3>{selectedTable.name}</h3>

                    <p>
                      Joy turi:{" "}
                      <strong>
                        {selectedTable.type}
                      </strong>
                    </p>

                    <p>
                      Sig‘imi:{" "}
                      <strong>
                        {selectedTable.capacity} kishi
                      </strong>
                    </p>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => setStep(2)}
                    >
                      Shu joyni tanlash
                    </button>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <form
                className="booking-form"
                onSubmit={submitBooking}
              >
                <div className="modal-heading">
                  <p className="eyebrow">
                    MA’LUMOTLAR
                  </p>

                  <h2>Bron qilish</h2>

                  <p>
                    Tanlangan joy:{" "}
                    <strong>
                      {selectedTable?.name}
                    </strong>
                  </p>
                </div>

                <label>
                  Ismingiz *

                  <input
                    required
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={changeBooking}
                    placeholder="Ismingizni kiriting"
                  />
                </label>

                <label>
                  Telefon raqamingiz *

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={booking.phone}
                    onChange={changeBooking}
                    placeholder="+998 90 000 00 00"
                  />
                </label>

                <div className="form-row">
                  <label>
                    Sana *

                    <input
                      required
                      min={today}
                      type="date"
                      name="date"
                      value={booking.date}
                      onChange={changeBooking}
                    />
                  </label>

                  <label>
                    Vaqt *

                    <input
                      required
                      type="time"
                      name="time"
                      value={booking.time}
                      onChange={changeBooking}
                    />
                  </label>
                </div>

                <label>
                  Qo‘shimcha izoh

                  <textarea
                    name="comment"
                    value={booking.comment}
                    onChange={changeBooking}
                    placeholder="Qo‘shimcha istaklaringiz..."
                  />
                </label>

                <div className="booking-form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setStep(1)}
                  >
                    Ortga
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Bronni tasdiqlash
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="success-screen">
                <div className="success-icon">✓</div>

                <h2>Bron so‘rovi tayyor!</h2>

                <p>
                  Bron ma’lumotlaringiz qabul qilindi.
                </p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={closeBooking}
                >
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}