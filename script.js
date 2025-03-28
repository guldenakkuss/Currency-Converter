console.log("Script çalıştı");

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

// API key'ini buraya yapıştır
const apiKey = "Uayuj2eUuTPFNemei9ojPlZYUQsoIY2G";

const currencyList = ["USD", "EUR", "TRY", "GBP", "JPY", "CAD", "CHF", "CNY"];

function populateCurrencyDropdowns() {
  currencyList.forEach((currency) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = currency;
    option1.text = option2.text = currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "TRY";
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue)) {
    result.textContent = "Lütfen geçerli bir miktar girin.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?from=${from}&to=${to}&amount=${amountValue}`,
      {
        method: "GET",
        headers: {
          apikey: apiKey
        }
      }
    );

    const data = await response.json();

    if (data.result) {
      result.textContent = `${amountValue} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      result.textContent = "Dönüştürme başarısız. API yanıtı geçersiz.";
    }

  } catch (error) {
    result.textContent = "Bir hata oluştu. Tekrar deneyin.";
    console.error("API hatası:", error);
  }
}

convertBtn.addEventListener("click", convertCurrency);
populateCurrencyDropdowns();
