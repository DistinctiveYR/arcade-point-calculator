import urllib.request
page = urllib.request.urlopen('https://www.cloudskillsboost.google/public_profiles/72cf8f8d-749e-45eb-b8e8-bda8862b88b8')
content = page.read()

with open('webpage_content.html', 'wb') as file:
    file.write(content)

print("Webpage content has been written to 'webpage_content.txt'.")