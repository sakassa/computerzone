-- Insert sample gaming laptops
INSERT INTO laptops (name, brand, price, condition, specs, stock, image_url) VALUES
(
  'ROG Zephyrus G14',
  'ASUS',
  1299.99,
  'New',
  '{
    "CPU": "AMD Ryzen 9 5900HS",
    "GPU": "RTX 3060",
    "RAM": "16GB DDR4",
    "SSD": "1TB NVMe",
    "Screen": "14\" QHD 120Hz",
    "Weight": "3.5 lbs"
  }',
  5,
  '/placeholder.svg?height=300&width=400'
),
(
  'Legion 5 Pro',
  'Lenovo',
  1199.99,
  'Like New',
  '{
    "CPU": "AMD Ryzen 7 5800H",
    "GPU": "RTX 3070",
    "RAM": "16GB DDR4",
    "SSD": "512GB NVMe",
    "Screen": "16\" QHD 165Hz",
    "Weight": "5.4 lbs"
  }',
  3,
  '/placeholder.svg?height=300&width=400'
),
(
  'Alienware m15 R6',
  'Dell',
  1599.99,
  'New',
  '{
    "CPU": "Intel i7-11800H",
    "GPU": "RTX 3080",
    "RAM": "32GB DDR4",
    "SSD": "1TB NVMe",
    "Screen": "15.6\" FHD 360Hz",
    "Weight": "5.9 lbs"
  }',
  2,
  '/placeholder.svg?height=300&width=400'
),
(
  'Predator Helios 300',
  'Acer',
  999.99,
  'Like New',
  '{
    "CPU": "Intel i7-11700H",
    "GPU": "RTX 3060",
    "RAM": "16GB DDR4",
    "SSD": "512GB NVMe",
    "Screen": "15.6\" FHD 144Hz",
    "Weight": "5.1 lbs"
  }',
  4,
  '/placeholder.svg?height=300&width=400'
),
(
  'MSI GS66 Stealth',
  'MSI',
  1399.99,
  'New',
  '{
    "CPU": "Intel i7-11800H",
    "GPU": "RTX 3070",
    "RAM": "32GB DDR4",
    "SSD": "1TB NVMe",
    "Screen": "15.6\" QHD 240Hz",
    "Weight": "4.6 lbs"
  }',
  1,
  '/placeholder.svg?height=300&width=400'
),
(
  'TUF Gaming A15',
  'ASUS',
  799.99,
  'Like New',
  '{
    "CPU": "AMD Ryzen 7 4800H",
    "GPU": "RTX 3050",
    "RAM": "8GB DDR4",
    "SSD": "512GB NVMe",
    "Screen": "15.6\" FHD 144Hz",
    "Weight": "5.1 lbs"
  }',
  6,
  '/placeholder.svg?height=300&width=400'
);
