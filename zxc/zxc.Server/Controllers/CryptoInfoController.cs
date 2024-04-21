using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bybit.Net.Clients;

namespace zxc.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CryptoInfoController : ControllerBase
    {
        private static readonly object _lock = new object();

        [HttpGet(Name = "GetCryptoInfo")]
        public async Task<IEnumerable<CryptoInfo>> Get()
        {
            var client = new BybitSocketClient();
            var cryptoInfoDict = new Dictionary<string, CryptoInfo>();

            var symbols = new List<string> { "ETHUSDT", "BTCUSDT", "BNBUSDT", "SOLUSDT", "TONUSDT" };
            var tasks = new List<Task>();

            foreach (var symbol in symbols)
            {
                cryptoInfoDict[symbol] = new CryptoInfo
                {
                    Symbol = symbol,
                    LastPrice = 0, // Значения по умолчанию
                    LowPrice24h = 0,
                    HighPrice24h = 0,
                    Volume24h = 0
                };
                var task = Task.Run(async () =>
                {
                    var subscribeResult = await client.V5SpotApi.SubscribeToTickerUpdatesAsync(symbol, update =>
                    {
                        if (update.Data != null)
                        {
                            decimal lastPrice = update.Data.LastPrice;
                            decimal lowPrice = update.Data.LowPrice24h;
                            decimal highPrice = update.Data.HighPrice24h;
                            decimal volume24h = update.Data.Volume24h;

                            lock (_lock)
                            {
                                cryptoInfoDict[symbol] = new CryptoInfo
                                {
                                    LastPrice = lastPrice,
                                    LowPrice24h = lowPrice,
                                    HighPrice24h = highPrice,
                                    Symbol = symbol,
                                    Volume24h = volume24h
                                };
                            }
                        }
                    });
                });

                tasks.Add(task);
            }

            await Task.WhenAll(tasks);

            // Возвращаем значения из словаря в строгом порядке
            return symbols.Select(symbol => cryptoInfoDict[symbol]);
        }
    }
}
