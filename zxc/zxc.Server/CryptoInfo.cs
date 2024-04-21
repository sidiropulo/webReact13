namespace zxc.Server
{
    public class CryptoInfo
    {
        public decimal LastPrice { get; set; }

        public decimal LowPrice24h { get; set; }

        public decimal HighPrice24h { get; set; }

        public string? Symbol { get; set; }

        public decimal Volume24h { get; set; }
    }
}
