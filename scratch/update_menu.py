import re

html_file = r'c:\SmartCafe\menu.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

hot_coffees = ["Espresso Double", "Americano", "Cappuccino", "Latte Macchiato", "Mocha", "Flat White", "Cortado", "Macchiato", "Irish Coffee", "Affogato", "Vienna Coffee", "Ristretto", "Lungo", "Cafe au Lait", "Breve", "Red Eye", "Black Eye", "Doppio", "Galao", "Frappe"]
cold_drinks = ["Iced Latte", "Cold Brew", "Iced Caramel Macchiato", "Strawberry Smoothie", "Mango Smoothie", "Iced Mocha", "Vanilla Frappuccino", "Lemonade", "Iced Americano", "Chocolate Milkshake", "Iced Matcha", "Peach Iced Tea", "Berry Blast", "Mint Mojito Coffee", "Iced Vanilla Latte", "Cold Brew Nitro", "Banana Smoothie", "Iced White Mocha", "Passionfruit Iced Tea", "Caramel Frappuccino"]
bakery = ["Butter Croissant", "Cheese Cake", "Blueberry Muffin", "Chocolate Chip Cookie", "Cinnamon Roll", "Banana Bread", "Almond Croissant", "Red Velvet Cake", "Brownie", "Apple Pie", "Lemon Tart", "Carrot Cake", "Tiramisu", "Danish Pastry", "Bagel with Cream Cheese", "Macarons", "Eclair", "Pound Cake", "Scone", "Baguette Sandwich"]
premium_teas = ["Matcha Latte", "Earl Grey", "English Breakfast", "Chamomile Tea", "Green Tea", "Peppermint Tea", "Oolong Tea", "Darjeeling Tea", "Jasmine Pearl", "Chai Latte", "Hibiscus Tea", "Rooibos Tea", "White Tea", "Lemon Ginger Tea", "Yerba Mate", "Sencha Green Tea", "Pu-erh Tea", "Lapsang Souchong", "Rose Petal Tea", "Assam Tea"]

categories = [
    ('hot', hot_coffees, 'Rich and aromatic hot coffee brew.'),
    ('cold', cold_drinks, 'Refreshing and cool icy beverage.'),
    ('bakery', bakery, 'Freshly baked premium snack.'),
    ('tea', premium_teas, 'Premium steeped tea with delicate flavors.')
]

img_map = {
    'hot': ['1510591509098-f4fdc6d0ff04', '1534778101976-62847782c213', '1556742049-0cfed4f6a45d', '1497935586351-b67a49e012bf', '1442512595331-e89e73853f31', '1511920170033-f8396924c348', '1506619231627-22614b433dc5', '1485808191679-5f8f983c3ba0'],
    'cold': ['1553530666-ba11a7da3888', '1517701550927-30cf4ba1dba5', '1461023058943-07cb1490c651', '1546833999-2824fea99a6b', '1556679343-c7306c1976bc', '1499961142455-c8bafd20860c', '1513558161293-cdaf765ed2fd', '1525914809-5a823ed61a1d'],
    'bakery': ['1555507036-ab1d4075c6f5', '1524351199678-941a58a3df50', '1509365465974-eb6b1c515a43', '1483695028939-5bb13f8648b0', '1495147466023-0650ed8bc727', '1519869325930-281384150729', '1505253716362-afbea1d8c117', '1505976378778-9e6b6bb5f690'],
    'tea': ['1536514072410-5019a3c69182', '1594631252845-29ce6f52304b', '1576092762791-dd9e2220d563', '1544787219-7f47cc8bc53b', '1582787019864-16a7fdb9b252', '1564890369474-722a7f5bcbf7', '1596484552834-6a58f850d032', '1571212891395-9cd8c21a1fc8']
}

js_items = []
js_items.append("{ id: 1, name: 'Espresso Double', price: 120, category: 'hot', desc: 'Strong and bold double shot of our signature roast.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80', isPopular: true }")
js_items.append("{ id: 2, name: 'Matcha Latte', price: 200, category: 'tea', desc: 'Premium matcha green tea with steamed milk.', img: 'https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&w=400&q=80', isPopular: true }")
js_items.append("{ id: 3, name: 'Americano', price: 130, category: 'hot', desc: 'Classic black coffee made with hot water and espresso.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80', isPopular: true }")

id_counter = 4

for cat, names, desc_base in categories:
    base_price = 100 if cat == 'bakery' else 150
    for i, name in enumerate(names):
        if name in ["Espresso Double", "Matcha Latte", "Americano"]:
            continue
            
        price = base_price + (i * 15 % 150)
        is_pop = "true" if i < 3 else "false"
        
        img_id = img_map[cat][i % len(img_map[cat])]
        img = f"https://images.unsplash.com/photo-{img_id}?auto=format&fit=crop&w=400&q=80"
        
        js_items.append(f"{{ id: {id_counter}, name: '{name}', price: {price}, category: '{cat}', desc: '{desc_base}', img: '{img}', isPopular: {is_pop} }}")
        id_counter += 1

js_array_str = "const menuItems = [\n            " + ",\n            ".join(js_items) + "\n        ];"

# Replace the array in HTML
content = re.sub(r'const menuItems = \[.*?\];', js_array_str, content, flags=re.DOTALL)

# Add Premium Tea button
if "Premium Tea" not in content:
    tea_btn = """<button class="filter-btn" onclick="setCategory('bakery')">Snacks</button>\n                    <button class="filter-btn" onclick="setCategory('tea')">Premium Tea</button>"""
    content = content.replace("""<button class="filter-btn" onclick="setCategory('bakery')">Snacks</button>""", tea_btn)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated menu.html with 80 items and Premium Tea category.")
