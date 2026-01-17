# Stripe 配置指南

本文档将指导你如何配置 Stripe 以支持新的定价方案。

## 📋 定价方案概览

### 🎟 Credit Packs (按需付费 - 积分永久有效)

| 套餐 | 积分 | 价格 | 约生成图片 | 环境变量 |
|------|------|------|-----------|----------|
| Basic | 1,000 | $19 | ~100 张 | `NEXT_PUBLIC_STRIPE_PRICE_CREDITS_BASIC` |
| Standard ⭐ | 5,000 | $79 | ~500 张 | `NEXT_PUBLIC_STRIPE_PRICE_CREDITS_STANDARD` |
| Premium | 20,000 | $299 | ~2,000 张 | `NEXT_PUBLIC_STRIPE_PRICE_CREDITS_PREMIUM` |

### 🧩 Monthly Subscription (月付订阅)

| 套餐 | 月积分 | 价格 | 约生成图片 | 环境变量 |
|------|--------|------|-----------|----------|
| Basic | 500 | $9.9/月 | ~50 张/月 | `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_BASIC` |
| Standard ⭐ | 2,500 | $39/月 | ~250 张/月 | `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_STANDARD` |
| Pro | 5,000 | $69/月 | ~500 张/月 | `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_PRO` |

### 🧩 Yearly Subscription (年付订阅 - 赠送2个月)

| 套餐 | 年积分 | 价格 | 月均价格 | 环境变量 |
|------|--------|------|----------|----------|
| Basic Yearly | 6,000 | $99/年 | ~$8/月 | `NEXT_PUBLIC_STRIPE_PRICE_YEARLY_BASIC` |
| Standard Yearly ⭐ | 30,000 | $399/年 | ~$33/月 | `NEXT_PUBLIC_STRIPE_PRICE_YEARLY_STANDARD` |
| Pro Yearly | 60,000 | $699/年 | ~$58/月 | `NEXT_PUBLIC_STRIPE_PRICE_YEARLY_PRO` |

## 🚀 配置步骤

### 步骤 1: 获取 Stripe API 密钥

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com)
2. 点击右上角的 **Developers** → **API keys**
3. 复制以下密钥：
   - **Secret key** (sk_test_... 或 sk_live_...)
   - **Publishable key** (pk_test_... 或 pk_live_...)

### 步骤 2: 在 Stripe 中创建产品

#### A. Credit Packs (按需付费)

在 Stripe Dashboard 中：

1. 进入 **Products** → **Add product**
2. 创建以下产品：

**Basic Credit Pack**
```
Name: Basic Credit Pack
Description: 1,000 credits - Credits never expire - Generate ~100 images
Pricing Model: One-time
Price: $19.00 USD
```
复制生成的 **Price ID** (格式: `price_xxxxx`)

**Standard Credit Pack** ⭐
```
Name: Standard Credit Pack
Description: 5,000 credits - Credits never expire - Generate ~500 images
Pricing Model: One-time
Price: $79.00 USD
```
复制生成的 **Price ID**

**Premium Credit Pack**
```
Name: Premium Credit Pack
Description: 20,000 credits - Credits never expire - Generate ~2,000 images
Pricing Model: One-time
Price: $299.00 USD
```
复制生成的 **Price ID**

#### B. Monthly Subscription (月付订阅)

**Basic Monthly**
```
Name: Basic Monthly Subscription
Description: 500 credits per month - Auto-renewal - Generate ~50 images/month
Pricing Model: Recurring
Billing Period: Monthly
Price: $9.90 USD
```
复制生成的 **Price ID**

**Standard Monthly** ⭐
```
Name: Standard Monthly Subscription
Description: 2,500 credits per month - Auto-renewal - Generate ~250 images/month
Pricing Model: Recurring
Billing Period: Monthly
Price: $39.00 USD
```
复制生成的 **Price ID**

**Pro Monthly**
```
Name: Pro Monthly Subscription
Description: 5,000 credits per month - Auto-renewal - Generate ~500 images/month
Pricing Model: Recurring
Billing Period: Monthly
Price: $69.00 USD
```
复制生成的 **Price ID**

#### C. Yearly Subscription (年付订阅)

**Basic Yearly**
```
Name: Basic Yearly Subscription
Description: 6,000 credits per year - 2 months free - Generate ~600 images/year
Pricing Model: Recurring
Billing Period: Yearly
Price: $99.00 USD
```
复制生成的 **Price ID**

**Standard Yearly** ⭐
```
Name: Standard Yearly Subscription
Description: 30,000 credits per year - 2 months free - Generate ~3,000 images/year
Pricing Model: Recurring
Billing Period: Yearly
Price: $399.00 USD
```
复制生成的 **Price ID**

**Pro Yearly**
```
Name: Pro Yearly Subscription
Description: 60,000 credits per year - 2 months free - Generate ~6,000 images/year
Pricing Model: Recurring
Billing Period: Yearly
Price: $699.00 USD
```
复制生成的 **Price ID**

### 步骤 3: 配置 Webhook

1. 进入 **Developers** → **Webhooks**
2. 点击 **Add endpoint**
3. Endpoint URL:
   - 生产环境: `https://yourdomain.com/api/webhooks/stripe`
   - 本地测试: 使用 Stripe CLI (见下方说明)
4. 选择以下事件：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. 复制 **Signing secret** (格式: `whsec_xxxxx`)

### 步骤 4: 更新 .env 文件

将所有 Price ID 填入 `.env` 文件：

```bash
# -----------------------------------------------------------------------------
# Stripe Configuration
# -----------------------------------------------------------------------------
STRIPE_SECRET_KEY="sk_test_你的密钥"
STRIPE_WEBHOOK_SECRET="whsec_你的webhook密钥"

# Credit Packs (Pay as You Go - One-time payment)
NEXT_PUBLIC_STRIPE_PRICE_CREDITS_BASIC="price_xxxxx"      # $19 - 1,000 credits
NEXT_PUBLIC_STRIPE_PRICE_CREDITS_STANDARD="price_xxxxx"   # $79 - 5,000 credits
NEXT_PUBLIC_STRIPE_PRICE_CREDITS_PREMIUM="price_xxxxx"    # $299 - 20,000 credits
NEXT_PUBLIC_STRIPE_PRICE_CREDITS_ENTERPRISE=""            # Optional

# Monthly Subscription
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_BASIC="price_xxxxx"      # $9.9/month - 500 credits
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_STANDARD="price_xxxxx"   # $39/month - 2,500 credits
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_PRO="price_xxxxx"        # $69/month - 5,000 credits

# Yearly Subscription
NEXT_PUBLIC_STRIPE_PRICE_YEARLY_BASIC="price_xxxxx"       # $99/year - 6,000 credits
NEXT_PUBLIC_STRIPE_PRICE_YEARLY_STANDARD="price_xxxxx"    # $399/year - 30,000 credits
NEXT_PUBLIC_STRIPE_PRICE_YEARLY_PRO="price_xxxxx"         # $699/year - 60,000 credits
```

### 步骤 5: 重启开发服务器

配置完成后，重启开发服务器以加载新的环境变量：

```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
pnpm dev
```

## 🧪 本地测试 Webhook

### 安装 Stripe CLI

```bash
# Windows (使用 Scoop)
scoop install stripe

# macOS (使用 Homebrew)
brew install stripe/stripe-cli/stripe

# Linux
# 下载二进制文件: https://github.com/stripe/stripe-cli/releases
```

### 登录并转发 Webhook

```bash
# 登录 Stripe
stripe login

# 转发 webhook 到本地
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

这会生成一个 webhook signing secret，将其复制到 `.env` 文件的 `STRIPE_WEBHOOK_SECRET` 中。

### 测试支付流程

```bash
# 触发测试 checkout 完成事件
stripe trigger checkout.session.completed
```

## 📝 测试卡号

在测试模式下，使用以下测试卡号：

| 卡号 | 用途 |
|------|------|
| `4242 4242 4242 4242` | 成功支付 |
| `4000 0000 0000 0002` | 卡被拒绝 |
| `4000 0000 0000 9995` | 余额不足 |

- 过期日期: 任何未来日期
- CVC: 任何3位数字
- 邮编: 任何5位数字

## ✅ 验证配置

1. 访问定价页面: `http://localhost:3000/pricing`
2. 检查所有价格是否正确显示
3. 点击购买按钮，确认跳转到 Stripe Checkout
4. 使用测试卡号完成支付
5. 检查 webhook 是否正确接收事件

## 🔒 生产环境部署

### 切换到生产模式

1. 在 Stripe Dashboard 中切换到 **Live mode**
2. 重新创建所有产品和价格（或使用 Stripe CLI 导入）
3. 获取生产环境的 API 密钥
4. 配置生产环境的 webhook endpoint
5. 更新生产环境的 `.env` 文件

### 重要提示

- ⚠️ 确保生产环境使用 `sk_live_` 开头的密钥
- ⚠️ 生产环境的 Price ID 与测试环境不同，需要重新配置
- ⚠️ 配置真实的 webhook endpoint URL
- ⚠️ 测试所有支付流程后再上线

## 🆘 常见问题

### Q: Price ID 在哪里找？
A: 在 Stripe Dashboard 的 Products 页面，点击产品，在 Pricing 部分可以看到 Price ID。

### Q: Webhook 没有收到事件？
A:
1. 检查 webhook endpoint URL 是否正确
2. 确认 webhook secret 配置正确
3. 查看 Stripe Dashboard 的 Webhooks 页面的事件日志
4. 本地测试使用 Stripe CLI 转发

### Q: 支付成功但积分没有到账？
A:
1. 检查 webhook 是否正确接收 `checkout.session.completed` 事件
2. 查看服务器日志是否有错误
3. 确认数据库连接正常

### Q: 如何切换测试/生产环境？
A: 在 Stripe Dashboard 右上角有一个开关，可以在 Test mode 和 Live mode 之间切换。

## 📚 相关文档

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe API 文档](https://stripe.com/docs/api)
- [Stripe Checkout 文档](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks 文档](https://stripe.com/docs/webhooks)
- [Stripe CLI 文档](https://stripe.com/docs/stripe-cli)

## 💡 提示

- 建议先在测试模式下完整测试所有支付流程
- 定期检查 Stripe Dashboard 的事件日志
- 为每个产品添加清晰的描述，方便用户理解
- 考虑添加促销码功能（Stripe Coupons）
- 监控支付成功率和失败原因
