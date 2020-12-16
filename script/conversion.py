import lxml.etree as ET
import re

def to_latex(text):

    """ Remove TeX codes in text"""
    text = re.sub(r"(\$\$.*?\$\$)", " ", text)

    """ Find MathML codes and replace it with its LaTeX representations."""
    mml_codes = re.findall(r"(<math.*?<\/math>)", text)
    for mml_code in mml_codes:
        mml_ns = mml_code.replace('<math>', '<math xmlns="http://www.w3.org/1998/Math/MathML">') #Required.
        mml_dom = ET.fromstring(mml_ns)
        xslt = ET.parse("mmltex.xsl")  ## see http://xsltml.sourceforge.net/
        transform = ET.XSLT(xslt)
        mmldom = transform(mml_dom)
        latex_code = str(mmldom)
        text = text.replace(mml_code, latex_code)
    return text

import os

for filename in os.listdir('../contents/'):
    if filename.endswith(".md") or filename.endswith(".py"):
        file1 = open('../contents/'+filename, "r",encoding="utf8")
        fileContent = file1.read()
        file1.close()
        fileConverted=to_latex(fileContent)
        print(filename)
        file2 = open('../contents/'+filename, "w",encoding="utf8")
        file2.write(fileConverted)
        file2.close()
        continue
    else:
        continue
#example1 = "../contents/m42033.md"
#file1 = open(example1, "r+",encoding="utf8")
#print(file1)
#fileContent = file1.read()
#fileConverted=to_latex(fileContent)
#print(fileConverted)
#file1.write(fileConverted)
#file1.close()