from pypdf import PdfReader


def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text


def extract_document_text(file_path, file_type):

    if file_type == "txt":
        return extract_text_from_txt(file_path)

    elif file_type == "pdf":
        return extract_text_from_pdf(file_path)

    return ""