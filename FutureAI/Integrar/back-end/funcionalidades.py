import pandas as pd
from io import StringIO
from fastapi import UploadFile
from fastapi.responses import HTMLResponse
import plotly.express as px

df_global = None  # Variável global para armazenar o DataFrame

def processar_csv(file_content: bytes) -> dict:
    global df_global
    try:
        decoded = file_content.decode('utf-8')
        df = pd.read_csv(StringIO(decoded))
        df_global = df  # Armazena o DataFrame na variável global
        return {
            "colunas": df.columns.tolist(),
            "linhas": len(df)
        }
    except Exception as e:
        raise ValueError(f"Erro ao processar CSV: {str(e)}")

def get_df():
    global df_global
    if df_global is None:
        raise ValueError("Nenhum CSV foi carregado ainda.")
    return df_global

def preparar_dados_para_regressao(df: pd.DataFrame, coluna_x: str, coluna_y: str) -> pd.DataFrame:
    # Verifica se as colunas existem
    if coluna_x not in df.columns or coluna_y not in df.columns:
        raise ValueError(f"Colunas '{coluna_x}' ou '{coluna_y}' não existem no CSV.")

    # Remove valores ausentes
    df = df[[coluna_x, coluna_y]].dropna()

    # Filtra outliers (mantém até o percentil 95 de y)
    limite_superior = df[coluna_y].quantile(0.95)
    df = df[df[coluna_y] <= limite_superior]

    # Conversão de colunas se necessário
    df[coluna_x] = pd.to_numeric(df[coluna_x], errors='coerce')
    df[coluna_y] = pd.to_numeric(df[coluna_y], errors='coerce')

    # Remoção de valores que viraram NaN após conversão
    df = df.dropna()

    return df



def gerar_grafico_regressao(df: pd.DataFrame, coluna_x: str, coluna_y: str) -> HTMLResponse:
    from fastapi.responses import HTMLResponse
    import plotly.express as px

    try:
        df = preparar_dados_para_regressao(df, coluna_x, coluna_y)
    except ValueError as e:
        return HTMLResponse(content=f"<h3>{str(e)}</h3>", status_code=400)

    fig = px.scatter(
        df,
        x=coluna_x,
        y=coluna_y,
        trendline="ols",
        title=f"Regressão Linear: {coluna_x} vs {coluna_y}",
        opacity=0.5
    )
    fig.update_traces(marker=dict(size=4, color='blue'))

    return HTMLResponse(content=fig.to_html(full_html=False, include_plotlyjs='cdn'))
