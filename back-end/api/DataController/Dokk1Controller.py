import pandas as pd
import gc


def get_sensors_info(data_dir):
    columns = [1, 4, 5, 6, 7]
    df = pd.read_csv(f'{data_dir}/DOKK1_Sensors_meta.csv', usecols=columns)
    res = df.to_dict('records')
    del df
    gc.collect()
    return res


def get_sensor_records(data_dir, start, end, id):
    df = pd.read_csv(f'{data_dir}/DOKK1_Sensors.csv').rename(columns={'date': 'datetime'})
    df['datetime_pd'] = pd.to_datetime(df['datetime'], infer_datetime_format=True)
    df.set_index(['datetime_pd'], inplace=True)

    query1 = df.loc[start:end]
    query2 = query1.loc[query1['sensor'] == id]
    res = query2.to_dict('records')
    del df, query2, query1
    gc.collect()
    return res
