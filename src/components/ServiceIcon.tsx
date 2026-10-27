type ServiceIconProps = {
  serviceId: string
  className?: string
}

export default function ServiceIcon({ serviceId, className = "w-6 h-6" }: ServiceIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  const icon = (() => {
    switch (serviceId) {
      case "baptismal":
        return (
          <>
            <path d="M12 3.2C9.6 6.3 6.7 9.4 6.7 13.3a5.3 5.3 0 0 0 10.6 0C17.3 9.4 14.4 6.3 12 3.2Z" />
            <path d="M12 9.3v6.2M9.7 12.1h4.6" />
          </>
        )
      case "confirmation":
        return (
          <>
            <path d="M12 3.2c.7 3-2.4 4.5-2.4 7.1 0 1.5 1.1 2.8 2.4 2.8 1.7 0 3-1.3 3-3.2 0-1.4-.8-2.8-1.8-4.1 2.7 1.8 4.4 4.5 4.4 7.4A5.6 5.6 0 0 1 12 18.8a5.6 5.6 0 0 1-5.6-5.6C6.4 9.5 8.7 6.2 12 3.2Z" />
            <path d="M12 13.2v7.2M9.8 16.1h4.4" />
          </>
        )
      case "communion":
        return (
          <>
            <path d="M7 4.2h10v2.6a5 5 0 0 1-10 0V4.2Z" />
            <path d="M12 11.8v5.3M8.7 20h6.6M9.5 17.1h5" />
            <path d="M4.5 4.2h15" />
          </>
        )
      case "matrimony":
        return (
          <>
            <circle cx="9.2" cy="12.5" r="5.1" />
            <circle cx="14.8" cy="12.5" r="5.1" />
            <path d="m10.4 5.3 1.6-2 1.6 2M12 3.3v3" />
          </>
        )
      case "death":
        return (
          <>
            <path d="M12 3.5v12.8M7.8 7.5h8.4" />
            <path d="M6 20.5h12M8.2 16.3 6 20.5M15.8 16.3l2.2 4.2" />
          </>
        )
      case "no-record":
        return (
          <>
            <path d="M6 3.5h8l4 4v5.3M14 3.5v4h4" />
            <path d="M10.3 20.5H6V3.5" />
            <circle cx="15.3" cy="16.2" r="3.3" />
            <path d="m17.7 18.6 2.3 2.3" />
          </>
        )
      case "good-standing":
        return (
          <>
            <path d="M12 3.2 19 6v5.2c0 4.5-2.8 7.6-7 9.6-4.2-2-7-5.1-7-9.6V6l7-2.8Z" />
            <path d="m8.8 12.1 2.1 2.1 4.5-4.7" />
          </>
        )
      default:
        return <path d="M12 3.5v17M3.5 12h17" />
    }
  })()

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...common}
    >
      {icon}
    </svg>
  )
}
