# Kharcha

Mahine aur page ke hisaab se kharcha likhne ki copy. Koi server ya database nahi, data aapke browser me save hota hai.

## GitHub Pages par daalne ke steps

1. GitHub par naya repository banao (jaise `kharcha`).
2. Is folder ki saari files (`index.html`, `sw.js`, `manifest.webmanifest`, teeno `icon-*.png`, `apple-touch-icon.png`) repository ke root me upload karo.
3. Repository me **Settings > Pages** kholo. **Source** me `Deploy from a branch`, branch `main`, folder `/ (root)` chuno aur Save karo.
4. 1-2 minute baad link milega: `https://<username>.github.io/kharcha/`
5. Phone me us link ko Chrome me kholo, menu me **Install app** ya **Add to Home screen** dabao.

## Dhyan rakhne ki baatein

- Data har device ke browser me save hota hai. Phone aur laptop me ek hi data ke liye menu me **Phone + laptop sync** chalu karo:
  1. https://github.com/settings/tokens/new?scopes=gist&description=Kharcha%20sync kholo, sirf **gist** tick rakho, Expiration **No expiration**, **Generate token**.
  2. Token (`ghp_...`) copy karo, app me paste karke **Sync chalu karo**. Dusre device par bhi wahi token daalo.
  3. Data aapke account ke ek private Gist (`kharcha.json`, "Kharcha sync (app data)") me rehta hai. Us Gist ko delete mat karna.
  Badlav kuch second me upload hote hain. Dusre device par app kholne par (ya khuli app me 30 second ke andar) aa jate hain.
- Token sirf usi device ke browser me rehta hai, backup file ya Gist me nahi jata. Kisi ke saath share mat karna.
- Sync chalu ho to **Backup wapas lao** purane data ko hatata nahi, dono jud jate hain.
- Bina sync ke le jana ho to menu me **Backup download karo** aur dusri jagah **Backup wapas lao**.
- iPhone par Safari aur Home Screen wala app alag-alag storage rakhte hain. Safari me likha kharcha installed app me nahi dikhega,
  isliye app install karne ke baad usi me likhna shuru karo (ya Backup se le aao).
- Browser ka data (site data) clear karoge to kharcha bhi chala jayega, isliye kabhi kabhi backup le lena.
- App update karne ke baad `sw.js` me `VERSION` ka naam badal do (jaise `kharcha-v2`), warna purana version cache se dikhta rahega.
