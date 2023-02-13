# DepremBot

Discord'da son depremleri yüksek ve az şiddetli olarak 2 kategoriye ayırıp ayrı channel'larda gösteren bot.

## Kullanım

- Kurulumdan önce root içerisindeki .env.example dosyasının adını .env olarak değiştiriniz.
- Channel ID'lerini ve bot token'ınızı .env dosyasına giriniz. Ayrıca Guild ID, botu kuracağınız sunucunun ID'sidir.
- .env dosyasında Low ve High channel ID'lerini değiştirerek hangi channel'a hangi depremler gönderileceğini ayarlayabilirsiniz. (Low: 0-3, High: 4-10 arası depremleri temsil etmektedir)

## Kurulum

1. `git clone git@github.com:erenkulaksiz/dc-deprem.git
2. `cd dc-deprem`
3. `npm install`
4. `npm run build`
5. `npm run start`

