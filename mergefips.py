#this program does a left join on the NYT Covid data and the Census county latitude and longitude spreadsheet on the FIPs column.
import pandas as pd
df1 = pd.read_csv('./live/us-counties.csv') #daily county data
df2 = pd.read_csv('./live/fipslatlong.csv') #FIPS, Latitude, and Longitude information
#merges both csvs using NYT data fips keys only
df_final = pd.merge(df1, df2, how='left', left_on='fips', right_on='fips')
df_final.to_csv('./live/merged.csv', index=False)