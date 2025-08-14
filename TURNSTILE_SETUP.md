# Cloudflare Turnstile 集成说明

本项目已集成 Cloudflare Turnstile 人机验证功能，用于保护登录和注册接口免受机器人攻击。

## 功能特性

- ✅ 登录页面人机验证
- ✅ 注册页面人机验证  
- ✅ 自动验证token有效性
- ✅ 支持环境变量配置
- ✅ 响应式设计，适配移动端

## 环境变量配置

在您的部署环境中设置以下环境变量：

### 必需变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | 前端显示的站点密钥 | `0x4AAAAAABri7OqoFEkpgi9C` |
| `TURNSTILE_SECRET_KEY` | 后端验证的密钥 | `0x4AAAAAABri7EJZ5VKGV-D6ZFKtQHS8AM8` |

### 获取密钥

1. 访问 [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. 创建新的站点密钥
3. 选择 "Managed" 类型
4. 复制站点密钥和密钥

## 部署说明

### Vercel 部署

在 Vercel 项目设置中添加环境变量：

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=你的站点密钥
TURNSTILE_SECRET_KEY=你的密钥
```

### Docker 部署

在 docker-compose.yml 或环境文件中添加：

```yaml
environment:
  - NEXT_PUBLIC_TURNSTILE_SITE_KEY=你的站点密钥
  - TURNSTILE_SECRET_KEY=你的密钥
```

### 其他平台

根据平台要求设置相应的环境变量即可。

## 工作原理

1. 用户在登录/注册页面看到 Turnstile 验证组件
2. 用户完成验证后，前端获取验证token
3. 提交表单时，将token发送到后端API
4. 后端验证token的有效性
5. 验证通过后，继续正常的登录/注册流程

## 安全说明

- 密钥存储在服务器端，不会暴露给客户端
- 每次验证都会向 Cloudflare 服务器确认token有效性
- 支持自动过期和错误处理
- 验证失败时会要求用户重新验证

## 故障排除

### 验证失败

1. 检查环境变量是否正确设置
2. 确认密钥是否有效且未过期
3. 检查网络连接是否正常
4. 查看浏览器控制台是否有错误信息

### 组件不显示

1. 确认 `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 已正确设置
2. 检查是否有JavaScript错误
3. 确认网络可以访问 Cloudflare CDN

## 自定义配置

如需自定义验证组件样式或行为，可以修改以下文件：

- `src/components/Turnstile.tsx` - 验证组件
- `src/lib/turnstile.ts` - 配置和验证逻辑
- `src/app/login/page.tsx` - 登录页面集成

## 支持

如有问题，请查看：
- [Cloudflare Turnstile 官方文档](https://developers.cloudflare.com/turnstile/)
- 项目 GitHub Issues 