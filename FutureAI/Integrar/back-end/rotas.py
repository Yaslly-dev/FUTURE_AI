from fastapi import APIRouter, UploadFile, File
from funcionalidades import processar_csv, gerar_grafico_regressao, df_global, get_df

router = APIRouter()

@router.get("/")
def read_root():
    return {"mensagem": "API funcionando com sucesso"}

@router.post("/uploadfile/")
async def upload_csv(file: UploadFile = File(...)):
    if file.content_type != 'text/csv':
        return {"erro": "O arquivo deve ser CSV"}
    
    content = await file.read()
    try:
        resultado = processar_csv(content)
        return resultado
    except ValueError as e:
        return {"erro": str(e)}

@router.post("/grafico/")
async def gerar_grafico(coluna_x: str, coluna_y: str):
    try:
        df = get_df()
        return gerar_grafico_regressao(df, coluna_x, coluna_y)
    except ValueError as e:
        return {"erro": str(e)}
