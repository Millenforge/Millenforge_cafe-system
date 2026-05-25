import re

html_file = r'c:\SmartCafe\menu.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

hot_data = [
    ("Espresso Double", 120, "A strong, intense, and bold double shot of our signature dark roast."),
    ("Americano", 130, "Classic smooth black coffee made with hot water and premium espresso."),
    ("Cappuccino", 150, "Rich espresso layered with steamed milk and a deep, pillowy layer of foam."),
    ("Latte Macchiato", 160, "Steamed milk gently stained with a slow-poured shot of espresso."),
    ("Mocha", 180, "A delightful blend of espresso, bittersweet chocolate sauce, and steamed milk."),
    ("Flat White", 170, "Smooth ristretto shots of espresso with expertly steamed velvety whole milk."),
    ("Cortado", 140, "Equal parts of rich espresso and warm milk to reduce the acidity."),
    ("Macchiato", 130, "A traditional espresso shot marked with a dollop of frothed milk."),
    ("Irish Coffee", 220, "Hot coffee, Irish whiskey, and sugar, topped with thick cream."),
    ("Affogato", 190, "A decadent dessert-style coffee with espresso poured over vanilla gelato."),
    ("Vienna Coffee", 160, "Two shots of strong black espresso topped with whipped cream instead of milk."),
    ("Ristretto", 110, "A short, concentrated, and sweeter shot of espresso."),
    ("Lungo", 120, "An extended espresso shot, allowing more water to pass through the grounds."),
    ("Cafe au Lait", 150, "Freshly brewed dark roast coffee with steamed milk."),
    ("Breve", 170, "A rich and creamy espresso-based drink made with steamed half-and-half."),
    ("Red Eye", 180, "A cup of strong brewed coffee with an added shot of espresso for extra kick."),
    ("Black Eye", 200, "For the bold: brewed coffee with a double shot of intense espresso."),
    ("Doppio", 120, "A straightforward, unadulterated double shot of our finest espresso."),
    ("Galao", 140, "A Portuguese signature: espresso mixed with foamed milk in a tall glass."),
    ("Frappe", 210, "A blended hot coffee drink, surprisingly frothy and deeply flavorful.")
]

cold_data = [
    ("Iced Latte", 160, "Chilled milk over ice, crowned with a smooth shot of espresso."),
    ("Cold Brew", 180, "Slow-steeped for 20 hours to create a super smooth, less acidic coffee."),
    ("Iced Caramel Macchiato", 190, "Vanilla syrup, milk, and ice topped with espresso and a caramel drizzle."),
    ("Strawberry Smoothie", 200, "Fresh strawberries blended with yogurt and ice for a refreshing treat."),
    ("Mango Smoothie", 200, "Tropical alphonso mangoes blended thick and smooth with cold milk."),
    ("Iced Mocha", 190, "Espresso combined with mocha sauce and milk over ice."),
    ("Vanilla Frappuccino", 220, "A rich and creamy blend of vanilla bean, milk, and ice, topped with whipped cream."),
    ("Lemonade", 120, "Freshly squeezed lemons with a hint of mint and ice."),
    ("Iced Americano", 140, "Espresso shots topped with cold water and ice for a refreshing lift."),
    ("Chocolate Milkshake", 180, "Thick, creamy, and indulgent milkshake made with premium Belgian chocolate."),
    ("Iced Matcha", 210, "Premium Japanese matcha green tea blended with milk and ice."),
    ("Peach Iced Tea", 150, "A sweet and fruity iced black tea infused with natural peach flavor."),
    ("Berry Blast", 210, "A medley of mixed berries blended into a refreshing, antioxidant-rich smoothie."),
    ("Mint Mojito Coffee", 190, "A uniquely refreshing iced coffee muddled with fresh mint leaves."),
    ("Iced Vanilla Latte", 170, "Our classic iced latte sweetened with aromatic vanilla syrup."),
    ("Cold Brew Nitro", 220, "Our signature cold brew infused with nitrogen for a creamy, velvety texture."),
    ("Banana Smoothie", 170, "Sweet bananas blended with honey and milk for a healthy boost."),
    ("Iced White Mocha", 200, "Espresso, white chocolate sauce, milk, and ice, topped with sweetened whipped cream."),
    ("Passionfruit Iced Tea", 160, "Vibrant and tangy passionfruit blended with our classic iced tea."),
    ("Caramel Frappuccino", 230, "Caramel syrup meets coffee, milk, and ice for a chunky, delicious blend.")
]

bakery_data = [
    ("Butter Croissant", 110, "Flaky, golden-brown, buttery French pastry baked fresh every morning."),
    ("Cheese Cake", 190, "Creamy, dense New York style cheese cake served with a berry compote."),
    ("Blueberry Muffin", 120, "Soft and tender muffin bursting with juicy wild blueberries."),
    ("Chocolate Chip Cookie", 90, "Oven-warm cookie loaded with giant gooey chocolate chunks."),
    ("Cinnamon Roll", 140, "Soft dough swirled with cinnamon sugar and topped with rich cream cheese icing."),
    ("Banana Bread", 110, "Moist and sweet banana bread slice, lightly toasted and buttered."),
    ("Almond Croissant", 150, "Classic croissant filled with sweet almond frangipane and topped with sliced almonds."),
    ("Red Velvet Cake", 200, "Decadent red velvet sponge with layers of smooth cream cheese frosting."),
    ("Brownie", 130, "Fudgy, dense, and ultra-chocolatey brownie with a crackly top."),
    ("Apple Pie", 160, "Traditional flaky crust filled with spiced, tender cinnamon apples."),
    ("Lemon Tart", 150, "A buttery tart shell filled with zesty and sharp lemon curd."),
    ("Carrot Cake", 180, "Spiced carrot cake with walnuts, raisins, and a cream cheese frosting."),
    ("Tiramisu", 210, "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone."),
    ("Danish Pastry", 130, "Flaky pastry filled with sweet cream cheese and topped with fruit preserves."),
    ("Bagel with Cream Cheese", 120, "Toasted authentic New York style bagel smeared with rich cream cheese."),
    ("Macarons", 250, "A delicate box of 3 assorted French macarons with ganache filling."),
    ("Eclair", 140, "Choux pastry filled with vanilla custard and dipped in chocolate fondant."),
    ("Pound Cake", 110, "A slice of dense, buttery, and vanilla-scented classic pound cake."),
    ("Scone", 100, "Crumbly English scone served warm with clotted cream and strawberry jam."),
    ("Baguette Sandwich", 220, "Crispy French baguette filled with premium cheese, lettuce, and meats.")
]

tea_data = [
    ("Matcha Latte", 200, "Premium grade matcha green tea whisked with gently steamed milk."),
    ("Earl Grey", 130, "A classic black tea infused with the citrusy aroma of bergamot oil."),
    ("English Breakfast", 120, "A robust, full-bodied black tea blend, perfect for starting the day."),
    ("Chamomile Tea", 140, "A soothing, caffeine-free herbal infusion made from whole chamomile flowers."),
    ("Green Tea", 130, "Light and refreshing pan-fired green tea leaves packed with antioxidants."),
    ("Peppermint Tea", 120, "A brisk, refreshing herbal tea made with pure peppermint leaves."),
    ("Oolong Tea", 160, "A semi-oxidized tea offering a complex flavor profile between green and black tea."),
    ("Darjeeling Tea", 150, "The 'champagne of teas', offering a delicate, floral, and slightly musky flavor."),
    ("Jasmine Pearl", 180, "Hand-rolled green tea pearls naturally scented with fresh jasmine blossoms."),
    ("Chai Latte", 170, "Spiced black tea blended with warm milk, cinnamon, cardamom, and ginger."),
    ("Hibiscus Tea", 140, "A vibrant, ruby-red herbal tea with a tart, cranberry-like flavor."),
    ("Rooibos Tea", 150, "A naturally sweet, caffeine-free red bush tea from South Africa."),
    ("White Tea", 170, "The most delicate tea, made from young leaves for a subtle, sweet flavor."),
    ("Lemon Ginger Tea", 130, "A zesty and warming herbal blend of fresh ginger and lemon peel."),
    ("Yerba Mate", 160, "A traditional South American energizing tea with an earthy, robust flavor."),
    ("Sencha Green Tea", 150, "A classic Japanese steamed green tea with a sweet and grassy flavor."),
    ("Pu-erh Tea", 190, "A fermented, aged dark tea with a deeply earthy and rich profile."),
    ("Lapsang Souchong", 160, "A distinctively smoky black tea, smoke-dried over pinewood fires."),
    ("Rose Petal Tea", 170, "A fragrant and elegant herbal infusion made from dried rose petals."),
    ("Assam Tea", 130, "A brisk, malty, and strong black tea grown in the Indian region of Assam.")
]

hot_imgs = ['1510591509098-f4fdc6d0ff04', '1556742049-0cfed4f6a45d', '1534778101976-62847782c213', '1497935586351-b67a49e012bf', '1442512595331-e89e73853f31', '1511920170033-f8396924c348', '1506619231627-22614b433dc5', '1485808191679-5f8f983c3ba0', '1572442388788-ce37c4e6eec2', '1495474472287-4d71bcdd2085', '1514432324607-a10c97726f1c', '1504630083234-1594668fd37c', '1521316730702-8290a13302ab', '1481833761820-0509d32170b7', '1509042239860-f550ce710b93', '1512568400610-ed411132df14', '1524156868116-2ba0f17b3f94', '1493857671505-72967e2d2760', '1518057111178-44a106bad636', '1506815918349-2f2bdfc836cc']
cold_imgs = ['1553530666-ba11a7da3888', '1517701550927-30cf4ba1dba5', '1461023058943-07cb1490c651', '1546833999-2824fea99a6b', '1556679343-c7306c1976bc', '1499961142455-c8bafd20860c', '1513558161293-cdaf765ed2fd', '1525914809-5a823ed61a1d', '1579954115545-a9539d058f32', '1494281258937-45f620f4c9c1', '1502159212845-f31a19546a5d', '1515431610996-5e5ce4b025b3', '1515823136277-3e81792dc8d8', '1498603612808-1cc63e7bce8c', '1514516142144-884ebbbbc23f', '1463132640232-a727e1f72782', '1531776516-43e62a1af828', '1482015527539-78711bd45941', '1511018556440-8e5da78f6534', '1510433604052-a526fb5165dc']
bakery_imgs = ['1555507036-ab1d4075c6f5', '1524351199678-941a58a3df50', '1509365465974-eb6b1c515a43', '1483695028939-5bb13f8648b0', '1495147466023-0650ed8bc727', '1519869325930-281384150729', '1505253716362-afbea1d8c117', '1505976378778-9e6b6bb5f690', '1506084868230-bb9ed95c68bb', '1488477181947-f15278478faa', '1509343259988-b1d515286104', '1484069560501-169ee4dc3518', '1508688404481-28565b0c950a', '1485081669829-bacb8c7bb1f3', '1473256599800-b48c7c70bd46', '1557308536-ee471ef2f534', '1508219665893-b4d6b6e40d04', '1511018556440-8e5da78f6534', '1483695028939-5bb13f8648b0', '1564834724105-918b73d1b9e0']
tea_imgs = ['1536514072410-5019a3c69182', '1594631252845-29ce6f52304b', '1576092762791-dd9e2220d563', '1544787219-7f47cc8bc53b', '1582787019864-16a7fdb9b252', '1564890369474-722a7f5bcbf7', '1596484552834-6a58f850d032', '1571212891395-9cd8c21a1fc8', '1558160074-4d7d8bdf925f', '1570535316358-052445b410de', '1555543788-b2170327f311', '1520626388484-9bc0abdbce30', '1563805042-7684c8b9e98c', '1573041908000-0e786bceccdb', '1559524021-0e86b0daeef7', '1541747169-2708bc172151', '1560699264-a6217d8ef0b3', '1556943806-a9792613ce47', '1561044458-9a2f768b5849', '1573336712-1f3c301625f3']

cat_data = {
    'hot': (hot_data, hot_imgs),
    'cold': (cold_data, cold_imgs),
    'bakery': (bakery_data, bakery_imgs),
    'tea': (tea_data, tea_imgs)
}

js_items = []
id_counter = 1

for cat in ['hot', 'cold', 'bakery', 'tea']:
    data, imgs = cat_data[cat]
    for i in range(20):
        name, price, desc = data[i]
        
        is_pop = "true" if i < 3 else "false"
        img_id = imgs[i]
        img_url = f"https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&w=400&q=80"
        
        if name in ["Espresso Double", "Matcha Latte", "Americano"]:
            is_pop = "true"
        
        desc = desc.replace("'", "\\'")
        js_items.append(f"{{ id: {id_counter}, name: '{name}', price: {price}, category: '{cat}', desc: '{desc}', img: '{img_url}', isPopular: {is_pop} }}")
        id_counter += 1

js_array_str = "const menuItems = [\n            " + ",\n            ".join(js_items) + "\n        ];"

content = re.sub(r'const menuItems = \[.*?\];', js_array_str, content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated menu.html with fully unique descriptions and images.")
