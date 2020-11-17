#this program does a left join on the NYT Covid data and the Census county latitude and longitude spreadsheet on the FIPs column.
import pandas as pd
df1 = pd.read_csv('us-counties.csv')
df2 = pd.read_csv('fipslatlong.csv')
#merges both csvs using NYT data fips keys only
df_final = pd.merge(df1, df2, how='left', left_on='fips', right_on='fips')
df_final.to_csv('merged.csv')